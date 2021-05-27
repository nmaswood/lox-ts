import { of } from "./../scanner/scan";
import { WithStream } from "./../stream/WithStream";
import * as Types from "./types";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

import * as Ex from "./Expr";
import * as S from "./Stmt";
import * as T from "../scanner/Token";
import { Stream } from "../stream/Stream";
import * as PE from "./ParseError";
import * as Streams from "../stream/Streams";
import * as C from "./Combinator";
import * as TC from "./TokenCombinator";

export function parse(
  tokensWithContext: T.TokenWithContext<T.Token>[]
): E.Either<PE.ParseError[], S.Stmt[]> {
  function f(
    stmts: S.Stmt[],
    errors: PE.ParseError[],
    stream: Types.TokenStream
  ): ReturnType<typeof parse> {
    if (isStreamExhausted(stream)) {
      return errors.length > 0 ? E.left(errors) : E.right(stmts);
    }

    return pipe(
      forDeclaration(stream),
      E.fold(
        (left) => f(stmts, [...errors, left], synchronize(stream)),
        (right) => f([...stmts, right.value], errors, right.stream)
      )
    );
  }

  return f([], [], new Stream(tokensWithContext));
}

type ParserResult<ValueT> = E.Either<
  PE.ParseError,
  WithStream<T.TokenWithContext<T.Token>, ValueT>
>;

const forDeclaration = () => (s: Types.TokenStream): ParserResult<S.Stmt> =>
  C.Combinator.oneOf(() => PE.UNEXPECTED_END, Hoist.DECLARATION_COMBINATORS)(s);

// function forDeclaration(
//   stream: Types.TokenStream<T.Token>
// ): ParserResult<S.Stmt> {
//   return pipe(
//     Streams.safeAdvance(stream),
//     E.chain(
//       (right): ParserResult<S.Stmt> => {
//         switch (right.value.token.type) {
//           case "var":
//             return forVar(right.stream);
//           case "print":
//             return forPrint(right.stream);
//           case "fun":
//             return forFun(right.stream);
//           case "class":
//             return forClass(right.stream);
//           case "while":
//             return forWhile(right.stream);
//           case "if":
//             return forIf(right.stream);
//           case "for":
//             return forFor(right.stream);
//           default:
//             return E.left(
//               PE.wrongToken(
//                 right.value,
//                 "var",
//                 "print",
//                 "fun",
//                 "class",
//                 "while",
//                 "if",
//                 "for"
//               )
//             );
//         }
//       }
//     )
//   );
// }

// varDecl → "var" IDENTIFIER ( "=" expression )? ";" ;
const forVar = () => (s: Types.TokenStream): ParserResult<S.Var> =>
  pipe(
    s,
    C.Combinator.and2(TC.is("var"), TC.is("identifier")),
    E.chain((identifier) => {
      const expr = pipe(
        identifier.stream,
        TC.is("equal"),
        E.chain(({ stream }) => forExpression()(stream)),
        E.getOrElseW(() => WithStream.of(identifier.stream, undefined)),

        ({ value, stream }) =>
          WithStream.of(stream, S.Var.of(identifier.value[1].token, value))
      );

      return pipe(
        expr.stream,
        TC.is("semicolon"),
        E.map(({ stream }) => WithStream.of(stream, expr.value))
      );
    })
  );

// printStmt → "print" expression ";" ;
const forPrint = () => (s: Types.TokenStream): ParserResult<S.Print> =>
  pipe(
    TC.is("print")(s),
    E.chain((print) =>
      pipe(
        forExpression()(print.stream),
        E.chain((expr) =>
          pipe(
            TC.is("semicolon")(expr.stream),
            E.map(({ stream }) => WithStream.of(stream, S.Print.of(expr.value)))
          )
        )
      )
    )
  );

//   /*
//    * function
//    *
//    * IDENTIFIER "(" parameters? ")" block ;
//    *  fun addPair(a, b) {
//    *    return a + b;
//    *   }
//    *
//    */
const forFunction = () => (s: Types.TokenStream): ParserResult<S.Function_> =>
  pipe(
    s,
    C.Combinator.and3(TC.is("fun"), TC.is("identifier"), TC.is("left_paren")),
    E.chain((withIdentifier) =>
      pipe(
        forParameters()(withIdentifier.stream),
        E.chain((withParameters) =>
          pipe(
            forBlock()(withParameters.stream),
            E.chain((withBlock) =>
              pipe(
                TC.is("semicolon")(withBlock.stream),
                E.map(({ stream }) =>
                  WithStream.of(
                    stream,
                    S.Function_.of(
                      withIdentifier.value[1].token,
                      withParameters.value,
                      withBlock.value
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );

namespace Hoist {
  export const DECLARATION_COMBINATORS: C.Combinator<
    T.TokenWithContext<T.Token>,
    S.Stmt,
    PE.ParseError
  >[] = [forVar(), forPrint(), forFunction()];
}

function forFun(
  stream: Types.TokenStream<T.Token>
): E.Either<PE.ParseError, Types.WithStream<S.Function_>> {
  return undefined!;
}

function forClass(
  stream: Types.TokenStream<T.Token>
): E.Either<PE.ParseError, Types.WithStream<S.Class>> {
  return undefined!;
}

function forWhile(
  stream: Types.TokenStream<T.Token>
): E.Either<PE.ParseError, Types.WithStream<S.While>> {
  return undefined!;
}

function forIf(
  stream: Types.TokenStream<T.Token>
): E.Either<PE.ParseError, Types.WithStream<S.If>> {
  return undefined!;
}

function forFor(
  stream: Types.TokenStream<T.Token>
): E.Either<PE.ParseError, Types.WithStream<S.For>> {
  return undefined!;
}

//parameters → IDENTIFIER ( "," IDENTIFIER )_ ;
const forParameters = () => (
  s: Types.TokenStream
): ParserResult<T.Identifier[]> => {
  const recurse = (
    acc: WithStream<T.TokenWithContext<T.Token>, T.Identifier[]>
  ): ParserResult<T.Identifier[]> =>
    pipe(
      acc.stream,
      Streams.Either.safeAdvance(() => PE.UNEXPECTED_END),

      E.chain((next) => {
        const token = next.value.token;
        switch (token.type) {
          case "identifier": {
            return recurse(WithStream.of(next.stream, [...acc.value, token]));
          }
          case "comma":
            return recurse(WithStream.of(next.stream, acc.value));
          case "right_brace":
            return E.right(WithStream.of(next.stream, acc.value));
          default:
            return E.left(
              PE.wrongToken(next.value, "identifier", "comma", "right_brace")
            );
        }
      })
    );
  return recurse(WithStream.of(s, []));
};
// block → "{" declaration\* "}" ;
const forBlock = () => (s: Types.TokenStream): ParserResult<S.Stmt[]> =>
  pipe(
    TC.is("left_brace")(s),
    E.chain(({ stream }) => {
      const parameters = C.Combinator.zeroOrMore(
        [] as S.Stmt[],
        (val, acc) => [...acc, val],
        forDeclaration()
      )(stream);

      return pipe(
        parameters.stream,
        TC.is("right_brace"),
        E.map(({ stream }) => WithStream.of(stream, parameters.value))
      );
    })
  );

const forExpression = () => (
  stream: Types.TokenStream
): ParserResult<Ex.Expr> => undefined!;

/*
    * expression     → assignment ;
    * assignment     → ( call "." )? IDENTIFIER "=" assignment | logic_or ;
    * logic_or       → logic_and ( "or" logic_and )* ;
    * logic_and      → equality ( "and" equality )* ;
    * equality       → comparison ( ( "!=" | "==" ) comparison )* ;
    * comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
    * term           → factor ( ( "-" | "+" ) factor )* ;
    * factor         → unary ( ( "/" | "*" ) unary )* ;
    * unary          → ( "!" | "-" ) unary | call ;
    * call           → primary ( "(" arguments? ")" | "." IDENTIFIER )* ;
    * primary        → "true" | "false" | "nil" | "this"
                       | NUMBER | STRING | IDENTIFIER | "(" expression ")"
                       | "super" "." IDENTIFIER ;
   */
//   static forExpression(context: Context): E.Either<PE.ParseError, S.Expr> {
//     return pipe(
//       this.forAssignment(context),
//       E.chain(assertSequence(context, "semicolon"))
//     );
//   }

//   static forAssignment(context: Context): E.Either<PE.ParseError, S.Expr> {
//     return undefined!;
//   }

//   static forLogicalAnd(context: Context): E.Either<PE.ParseError, S.Expr> {
//     const recurse = (acc: S.Expr): E.Either<PE.ParseError, S.Expr> =>
//       pipe(
//         safePeek(context.stream),
//         E.chain((peeked) => {
//           switch (peeked.token.type) {
//             case "and": {
//               const operator = peeked.token;
//               return pipe(
//                 safeAdvance(context.stream),
//                 E.chain(() => this.forEquality(context)),
//                 E.chain((factor) =>
//                   recurse(
//                     S.Expr.of(Ex.Binary.of(operator, acc.value, factor.value))
//                   )
//                 )
//               );
//             }
//             default:
//               return E.right(acc);
//           }
//         })
//       );

//     return pipe(
//       this.forComparison(context),
//       E.map((factor) =>
//         pipe(
//           recurse(factor),
//           E.getOrElse(() => factor)
//         )
//       )
//     );
//   }

//   static forEquality(context: Context): E.Either<PE.ParseError, S.Expr> {
//     const recurse = (acc: S.Expr): E.Either<PE.ParseError, S.Expr> =>
//       pipe(
//         safePeek(context.stream),
//         E.chain((peeked) => {
//           switch (peeked.token.type) {
//             case "equal_equal":
//             case "bang_equal": {
//               const operator = peeked.token;
//               return pipe(
//                 safeAdvance(context.stream),
//                 E.chain(() => this.forComparison(context)),
//                 E.chain((factor) =>
//                   recurse(
//                     S.Expr.of(Ex.Binary.of(operator, acc.value, factor.value))
//                   )
//                 )
//               );
//             }
//             default:
//               return E.right(acc);
//           }
//         })
//       );

//     return pipe(
//       this.forComparison(context),
//       E.map((factor) =>
//         pipe(
//           recurse(factor),
//           E.getOrElse(() => factor)
//         )
//       )
//     );
//   }

//   static forComparison(context: Context): E.Either<PE.ParseError, S.Expr> {
//     const recurse = (acc: S.Expr): E.Either<PE.ParseError, S.Expr> =>
//       pipe(
//         safePeek(context.stream),
//         E.chain((peeked) => {
//           switch (peeked.token.type) {
//             case "less":
//             case "less_equal":
//             case "greater":
//             case "greater_equal": {
//               const operator = peeked.token;
//               return pipe(
//                 safeAdvance(context.stream),
//                 E.chain(() => this.forTerm(context)),
//                 E.chain((factor) =>
//                   recurse(
//                     S.Expr.of(Ex.Binary.of(operator, acc.value, factor.value))
//                   )
//                 )
//               );
//             }
//             default:
//               return E.right(acc);
//           }
//         })
//       );

//     return pipe(
//       this.forTerm(context),
//       E.map((factor) =>
//         pipe(
//           recurse(factor),
//           E.getOrElse(() => factor)
//         )
//       )
//     );
//   }

//   //* term           → factor ( ( "-" | "+" ) factor )* ;
//   static forTerm(context: Context): E.Either<PE.ParseError, S.Expr> {
//     const recurse = (acc: S.Expr): E.Either<PE.ParseError, S.Expr> =>
//       pipe(
//         safePeek(context.stream),
//         E.chain((peeked) => {
//           switch (peeked.token.type) {
//             case "minus":
//             case "plus": {
//               const operator = peeked.token;
//               return pipe(
//                 safeAdvance(context.stream),
//                 E.chain(() => this.forFactor(context)),
//                 E.chain((factor) =>
//                   recurse(
//                     S.Expr.of(Ex.Binary.of(operator, acc.value, factor.value))
//                   )
//                 )
//               );
//             }
//             default:
//               return E.right(acc);
//           }
//         })
//       );

//     return pipe(
//       this.forFactor(context),
//       E.map((factor) =>
//         pipe(
//           recurse(factor),
//           E.getOrElse(() => factor)
//         )
//       )
//     );
//   }

//   static forFactor(context: Context): E.Either<PE.ParseError, S.Expr> {
//     const recurse = (acc: Ex.Expr): E.Either<PE.ParseError, Ex.Expr> =>
//       pipe(
//         safePeek(context.stream),
//         E.chain((t) => {
//           switch (t.token.type) {
//             case "slash":
//             case "star": {
//               const operator = t.token;
//               return pipe(
//                 safeAdvance(context.stream),
//                 E.chain(() => this.forUnary(context)),
//                 E.chain((unary) =>
//                   recurse(Ex.Binary.of(operator, acc, unary.value))
//                 )
//               );
//             }
//             default:
//               return E.right(acc);
//           }
//         })
//       );

//     return pipe(
//       this.forUnary(context),
//       E.map((unary) =>
//         pipe(
//           recurse(unary.value),
//           E.map((ex) => S.Expr.of(ex)),
//           E.getOrElse(() => unary)
//         )
//       )
//     );
//   }

//   static forUnary(context: Context): E.Either<PE.ParseError, S.Expr> {
//     return pipe(
//       safeAdvance(context.stream),
//       E.chain((t) =>
//         pipe(
//           t.token.type === "bang" || t.token.type === "minus"
//             ? E.right(t.token)
//             : E.left(PE.wrongToken(t, "minus", "bang")),

//           E.chain((operator) =>
//             pipe(
//               this.forAssignment(context),
//               E.altW(() => this.forCall(context)),
//               E.map((expr) => S.Expr.of(Ex.Unary.of(operator, expr.value)))
//             )
//           )
//         )
//       )
//     );
//   }

//   /*
//    * call
//    * primary ( "(" arguments? ")" | "." IDENTIFIER )* ;
//    */
//   static forCall(context: Context): E.Either<PE.ParseError, S.Expr> {
//     const recurse = (acc: Ex.Expr): E.Either<PE.ParseError, Ex.Expr> =>
//       pipe(
//         safePeek(context.stream),
//         E.chain(({ token }) => {
//           switch (token.type) {
//             case "left_paren":
//               return pipe(
//                 this.forArguments(context),
//                 E.map((args) =>
//                   Ex.Call.of(
//                     acc,
//                     undefined!, // what does this even do?
//                     args.map((a) => a.value)
//            /for       )
//                 ),
//                 E.chain(recurse)
//               );
//             case "dot":
//               return pipe(
//                 assertSequenceWithUndefined(context, "dot"),
//                 E.chain(() => this.forIdentifier(context)),
//                 E.map((identifier) => Ex.Get.of(acc, identifier)),
//                 E.chain(recurse)
//               );
//             default:
//               return E.right(acc);
//           }
//         })
//       );

//     return pipe(
//       this.forPrimary(context),
//       E.chain((primary) => recurse(primary.value)),
//       E.map((ex) => S.Expr.of(ex))
//     );
//   }
//   /*
//    * parameters
//    * IDENTIFIER ( "," IDENTIFIER )* ;
//    * ()
//    * (a)
//    * (a, b)
//    */
//   static forArguments(context: Context): E.Either<PE.ParseError, S.Expr[]> {
//     const gatherArguments = (
//       acc: S.Expr[]
//     ): E.Either<PE.ParseError, S.Expr[]> =>
//       pipe(
//         safePeek(context.stream),
//         E.map(({ token }) => token),
//         E.chain((te) => {
//           switch (te.type) {
//             case "right_paren":
//               return E.right(acc);
//             case "comma":
//               return pipe(
//                 assertSequenceWithUndefined(context, "comma"),
//                 E.chain(() => gatherArguments(acc))
//               );
//             default:
//               return pipe(
//                 this.forExpression(context),
//                 E.map((expr) => [...acc, expr])
//               );
//           }
//         })
//       );

//     return pipe(
//       assertSequenceWithUndefined(context, "left_paren"),
//       E.chain(() => gatherArguments([]))
//     );
//   }

//   /*
//    *primary
//    * "true" | "false" | "nil" | "this"
//    * | NUMBER | STRING | IDENTIFIER | "(" expression ")"
//    * | "super" "." IDENTIFIER ;
//    */
//   static forPrimary(context: Context): E.Either<PE.ParseError, S.Expr> {
//     return pipe(
//       safeAdvance(context.stream),
//       E.chain(
//         (t): E.Either<PE.ParseError, Ex.Expr> => {
//           const { token } = t;
//           switch (token.type) {
//             case "true":
//             case "false":
//             case "number":
//             case "string":
//             case "nil":
//               return E.right(Ex.Literal.of(token));
//             case "this":
//               return E.right(Ex.This.of(t));
//             case "identifier":
//               return E.right(Ex.Variable.of(t));
//             case "left_paren":
//               return pipe(
//                 this.forExpression(context),
//                 E.chain(assertSequence(context, "right_paren")),
//                 E.map((expr) => Ex.Grouping.of(expr.value))
//               );
//             case "super":
//               return pipe(
//                 this.forIdentifier(context),
//                 E.map((method) => Ex.Super.of(t, method))
//               );
//             default:
//               return E.left(PE.MISC_ERROR);
//           }
//         }
//       ),
//       E.map((expr) => S.Expr.of(expr))
//     );
//   }

//   /*
//    * # TODO
//    * varDecl
//    * "var" IDENTIFIER ( "=" expression )? ";" ;
//    *
//    * var foo;
//    * var foo = "bar";
//    */

//   static forVar(context: Context): E.Either<PE.ParseError, S.Var> {
//     return pipe(
//       this.forIdentifier(context),
//       E.chain((identifier) =>
//         pipe(
//           safePeek(context.stream),
//           E.chain((peeked) => {
//             switch (peeked.token.type) {
//               case "semicolon":
//                 return pipe(
//                   assertSequenceWithUndefined(context, "semicolon"),
//                   E.map(() => S.Var.of(identifier, undefined))
//                 );
//               case "equal":
//                 return pipe(
//                   assertSequenceWithUndefined(context, "equal"),
//                   E.chain(() => Handler.forExpression(context)),
//                   E.chain(assertSequence(context, "semicolon")),
//                   E.map(({ value }) => S.Var.of(identifier, value))
//                 );
//               default:
//                 return E.left(PE.MISC_ERROR);
//             }
//           })
//         )
//       )
//     );
//   }

//   /*
//    * parameters
//    * IDENTIFIER ( "," IDENTIFIER )* ;
//    * ()
//    * (a)
//    * (a, b)
//    */
//   static forParameters(
//     context: Context
//   ): E.Either<PE.ParseError, T.Identifier[]> {
//     const gatherParams = (
//       acc: T.Identifier[]
//     ): E.Either<PE.ParseError, T.Identifier[]> =>
//       pipe(
//         safeAdvance(context.stream),
//         E.map(({ token }) => token),
//         E.chain((te) => {
//           switch (te.type) {
//             case "right_paren":
//               return E.right(acc);
//             case "comma":
//               return gatherParams(acc);
//             case "identifier":
//               return gatherParams([...acc, te]);
//             default:
//               return E.left(PE.MISC_ERROR);
//           }
//         })
//       );

//     return pipe(
//       assertSequenceWithUndefined(context, "left_paren"),
//       E.chain(() => gatherParams([]))
//     );
//   }

//   /*
//    * block
//    * "{" declaration* "}
//    *
//    * {
//    *  var i = 1;
//    * }
//    *
//    */

//   static forBlock(context: Context): E.Either<PE.ParseError, S.Stmt[]> {
//     const processBlock = (acc: S.Stmt[]) =>
//       pipe(
//         safePeek(context.stream),
//         E.chain(
//           (next): E.Either<PE.ParseError, S.Stmt[]> =>
//             next.token.type === "right_brace"
//               ? pipe(
//                   safeAdvance(context.stream),
//                   E.map(() => acc)
//                 )
//               : pipe(
//                   Handler.forDeclaration(context),
//                   E.chain((stmt) => processBlock([...acc, stmt]))
//                 )
//         )
//       );

//     return pipe(
//       assertSequenceWithUndefined(context, "left_brace"),
//       E.chain(() => processBlock([]))
//     );
//   }

//   /*
//    * printStmt
//    * "print" expression ";" ;
//    *
//    * print "Hello World";
//    */

//   static forPrint(context: Context): E.Either<PE.ParseError, S.Print> {
//     return pipe(
//       Handler.forExpression(context),
//       E.map(({ value }) => S.Print.of(value)),
//       E.chain(assertSequence(context, "semicolon"))
//     );
//   }

//   /*
//    * return
//    * "return" expression ";" ;
//    *
//    * return "Hello World";
//    */

//   static forReturn(context: Context): E.Either<PE.ParseError, S.Return> {
//     return pipe(
//       safePeek(context.stream),
//       E.map(({ token }) => token),
//       E.chain(
//         (te): E.Either<PE.ParseError, S.Expr | undefined> => {
//           switch (te.type) {
//             case "semicolon":
//               return E.right(undefined);
//             default:
//               return pipe(
//                 this.forExpression(context),
//                 E.chain(assertSequence(context, "semicolon"))
//               );
//           }
//         }
//       ),
//       E.map((value) => S.Return.of(value?.value))
//     );
//   }

//   /*
//    * classDecl
//    * "class" IDENTIFIER ( "<" IDENTIFIER "{" function* "}" ;
//    *
//    * class Breakfast {
//    *  cook() {
//    *     print "Eggs a-fryin'!";
//    *  }
//    *
//    *  serve(who) {
//    *     print "Enjoy your breakfast, " + who + ".";
//    *   }
//    *  }
//    */
//   static forClass(context: Context): E.Either<PE.ParseError, S.Class> {
//     const forSuperClass = (): E.Either<
//       PE.ParseError,
//       T.Identifier | undefined
//     > =>
//       pipe(
//         safePeekO(context.stream),
//         O.chain(O.fromPredicate((t) => t.token.type === "less")),
//         O.map(() => this.forIdentifier(context)),
//         O.getOrElseW(() => E.right(undefined))
//       );

//     const forFunctions = (
//       acc: S.Function_[]
//     ): E.Either<PE.ParseError, S.Function_[]> =>
//       pipe(
//         safePeek(context.stream),
//         E.chain((t) =>
//           t.token.type === "right_brace"
//             ? E.right(acc)
//             : pipe(
//                 this.forFunction(context),
//                 E.chain((func) => forFunctions([...acc, func]))
//               )
//         )
//       );

//     return pipe(
//       Handler.forIdentifier(context),
//       E.chain(assertSequence(context, "left_brace")),
//       E.chain((className) =>
//         pipe(
//           forSuperClass(),
//           E.map((superClassName) => ({
//             className,
//             superClassName,
//           }))
//         )
//       ),
//       E.chain(({ className, superClassName }) =>
//         pipe(
//           forFunctions([]),
//           E.map((funcs) => S.Class.of(className, superClassName, funcs))
//         )
//       )
//     );
//   }

//   static forIdentifier(
//     context: Context
//   ): E.Either<PE.ParseError, T.Identifier> {
//     return pipe(
//       safeAdvance(context.stream),
//       E.chain((t) =>
//         t.token.type === "identifier"
//           ? E.right(t.token)
//           : E.left(PE.wrongToken(t, "identifier"))
//       )
//     );
//   }

//   /*
//    *
//    * whileStmt
//    * "while" "(" expression ")" statement ;
//    *
//    * while (a < 10) {
//    *   print a;
//    *   a = a + 1;
//    * }
//    */

//   static forWhileStatement(context: Context): E.Either<PE.ParseError, S.While> {
//     return pipe(
//       assertSequenceWithUndefined(context, "left_paren"),
//       E.chain(() => this.forExpression(context)),
//       E.chain(assertSequence(context, "right_paren", "left_brace")),
//       E.chain((cond) =>
//         pipe(
//           this.forBlock(context),
//           E.map((stmts) => S.While.of(cond.value, stmts))
//         )
//       ),
//       E.chain(assertSequence(context, "right_brace"))
//     );
//   }

//   /*
//    * ifStmt
//    *
//    * "if" "(" expression ")" statement * ( "else" statement )? ;
//    *
//    * if (condition) {
//    *    print "yes";
//    *  } else {
//    *    print "no";
//    *  }
//    */
//   static forIfStatement(context: Context): E.Either<PE.ParseError, S.If> {
//     const forElse = () =>
//       pipe(
//         safePeek(context.stream),
//         E.chain((peeked) => {
//           switch (peeked.token.type) {
//             case "else":
//               return pipe(
//                 assertSequenceWithUndefined(context, "else"),
//                 E.chain(() => this.forBlock(context))
//               );
//             default:
//               return E.right(undefined);
//           }
//         })
//       );

//     return pipe(
//       assertSequenceWithUndefined(context, "left_paren"),
//       E.chain(() => this.forExpression(context)),
//       E.chain(assertSequence(context, "right_paren", "left_brace")),
//       E.chain((cond) =>
//         pipe(
//           this.forBlock(context),
//           E.chain((then) =>
//             pipe(
//               forElse(),
//               E.map((else_) => S.If.of(cond.value, then, else_))
//             )
//           )
//         )
//       )
//     );
//   }
//   /*
//    * forStmt
//    *  "for" "(" ( varDecl | exprStmt | ";" )
//    *   expression? ";"
//    *   expression? ")" statement ;
//    *
//    *
//    * for (var a = 1; a < 10; a = a + 1) {
//    * print a;
//    *  }
//    */
//   static forForStatement(context: Context): E.Either<PE.ParseError, S.For> {
//     return undefined!;
//   }
// }

function synchronize(stream: Types.TokenStream): Types.TokenStream {
  const copy = stream.clone();
  while (!isStreamExhausted(copy)) {
    const next = copy.advance();
    switch (next.token.type) {
      case "semicolon":
      case "class":
      case "fun":
        return copy;
      default:
        continue;
    }
  }
  return copy;
}

function isStreamExhausted(s: Stream<T.TokenWithContext<T.Token>>): boolean {
  return T.Eof.is(s.peek().token);
}