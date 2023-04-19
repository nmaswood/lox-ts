declaration → classDecl
| funDecl
| varDecl
| statement ;

classDecl → "class" IDENTIFIER ( "<" IDENTIFIER )?
"{" function\* "}" ;
funDecl → "fun" function ;
varDecl → "var" IDENTIFIER ( "=" expression )? ";"

statement → exprStmt
| forStmt
| ifStmt
| printStmt
| returnStmt
| whileStmt
| block ;

exprStmt → expression ";" ;
forStmt → "for" "(" ( varDecl | exprStmt | ";" )
expression? ";"
expression? ")" statement ;
ifStmt → "if" "(" expression ")" statement
( "else" statement )? ;
printStmt → "print" expression ";" ;
returnStmt → "return" expression? ";" ;
whileStmt → "while" "(" expression ")" statement ;
block → "{" declaration\* "}" ;

expression → assignment ;

assignment → ( call "." )? IDENTIFIER "=" assignment
| logic_or ;

logic*or → logic_and ( "or" logic_and )* ;
logic*and → equality ( "and" equality )* ;
equality → comparison ( ( "!=" | "==" ) comparison )_ ;
comparison → term ( ( ">" | ">=" | "<" | "<=" ) term )_ ;
term → factor ( ( "-" | "+" ) factor )\_ ;
factor → unary ( ( "/" | "\*" ) unary )\* ;

unary → ( "!" | "-" ) unary | call ;
call → primary ( "(" arguments? ")" | "." IDENTIFIER )\* ;
primary → "true" | "false" | "nil" | "this"
| NUMBER | STRING | IDENTIFIEj | "(" expression ")"
| "super" "." IDENTIFIER ;

function → IDENTIFIER "(" parameters? ")" block ;
parameters → IDENTIFIER ( "," IDENTIFIER )_ ;
arguments → expression ( "," expression )_ ;

NUMBER → DIGIT+ ( "." DIGIT+ )? ;
STRING → "\"" <any char except "\"">_ "\"" ;
IDENTIFIER → ALPHA ( ALPHA | DIGIT )_ ;
ALPHA → "a" ... "z" | "A" ... "Z" | "\_" ;
DIGIT → "0" ... "9" ;
