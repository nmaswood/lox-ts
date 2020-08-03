//< expr-unary
//> expr-variable
  static class Variable extends Expr {
    Variable(Token name) {
      this.name = name;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitVariableExpr(this);
    }

    final Token name;
  }
//< expr-variable

  abstract <R> R accept(Visitor<R> visitor);
}
//< Appendix II expr
