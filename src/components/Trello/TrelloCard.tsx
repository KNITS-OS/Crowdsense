import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
// @ts-ignore
// import { MovableCardWrapper } from "react-trello";

const TrelloCard = ({
  showDeleteButton: boolean,
  onDelete,
  onClick,
  style,
  tagStyle,
  className,
  id,
  title,
  label,
  description,
  tags,
}: any) => {
  // const clickDelete = (e: any) => {
  //   onDelete();
  //   e.stopPropagation();
  // };
  return (
    <>
      {/* <MovableCardWrapper
      onClick={onClick}
      style={cardStyle}
      className={className}
    > */}
      {/* <header
        style={{
          borderBottom: "1px solid #eee",
          paddingBottom: 6,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          color: cardColor,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: "bold" }}>{name}</div>
        <div style={{ fontSize: 11 }}>{dueOn}</div>
        {showDeleteButton && <Button onClick={clickDelete} />}
      </header>
      <div style={{ fontSize: 12, color: "#BD3B36" }}>
        <div style={{ color: "#4C4C4C", fontWeight: "bold" }}>
          {subTitle}
        </div>
        <div style={{ padding: "5px 0px" }}>
          <i>{body}</i>
        </div>
        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            color: cardColor,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {escalationText}
        </div>
        {tags && (
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: 6,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {tags.map((tag: ReactTrello.Tag) => (
              <span key={tag.title} {...tag} />
              // <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
            ))}
          </div>
        )}
      </div> */}
      <Card className="card-stats">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle
                tag="h5"
                className="text-uppercase text-muted mb-0"
              >
                Total traffic
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">350,897</span>
            </div>
            <Col className="col-auto">
              <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                <i className="ni ni-active-40" />
              </div>
            </Col>
          </Row>
          <p className="mt-3 mb-0 text-sm">
            <span className="text-success mr-2">
              <i className="fa fa-arrow-up" /> 3.48%
            </span>{" "}
            <span className="text-nowrap">Since last month</span>
          </p>
        </CardBody>
      </Card>
      {/* </MovableCardWrapper> */}
    </>
  );
};
export default TrelloCard;
