import React from "react";
import { Card, Rate } from "antd";

const { Meta } = Card;

const MovieCard = ({ Title, Description, PosterURL, Rating }) => {
  return (
    // Card Component for each movie
    <Card
      className="w-[65vw] sm:w-60"
      hoverable
      cover={<img alt="example" src={PosterURL} className="  sm:h-72" />}
      bodyStyle={{ padding: 10, textAlign: "center" }}
    >
      <Meta
        className=" sm:min-h-[120px] new"
        title={Title}
        description={Description.slice(0, 100)}
      />
      <Rate disabled defaultValue={Rating} className="mt-2" />
    </Card>
  );
};

export default MovieCard;
