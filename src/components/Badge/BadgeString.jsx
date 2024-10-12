const BadgeString = (props) => {
  const { text } = props;
  return <>{text ? text : "-"}</>;
};

export default BadgeString;
