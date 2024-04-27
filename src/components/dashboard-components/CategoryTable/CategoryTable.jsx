import React from "react";

export async function getServerSideProps() {
  const res = await fetch("/api/category");
  const categories = await res.json();

  return {
    props: {
      categories,
    },
  };
}

const CategoryTable = ({categories}) => {
  console.log(categories);
  return <div></div>;
};

export default CategoryTable;
