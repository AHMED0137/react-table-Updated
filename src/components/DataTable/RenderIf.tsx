type RenderIfProps = {
  isTrue?: boolean;
  isFalse?: boolean;
  children?: React.ReactNode;
  Else?: React.ReactNode;
};

export function RenderIf({ isTrue, isFalse, children, Else }: RenderIfProps) {
  if (isTrue && isFalse === undefined) {
    if (isTrue) return <>{children}</>;
    else return Else ? <>{Else}</> : null;
  } else if (isFalse === false) return <>{children}</>;
  else return Else ? <>{Else}</> : null;
}

export default RenderIf;
