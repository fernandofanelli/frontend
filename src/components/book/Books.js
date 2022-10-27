import React from "react";
import Book from "./Book";
import { Fade } from "react-awesome-reveal";

import classes from "./Books.module.css";

const Books = () => {
  // TODO bring this from the backend
  const books = [
    {
      _id: "book1",
      image: "/images/sk1.jpeg",
      title: "The Green Mile",
      description: `The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe's encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book2",
      image: "/images/sk2.jpeg",
      title: "Pet Sematary",
      description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book3",
      image: "/images/sk3.jpeg",
      title: "The Shining",
      description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book1",
      image: "/images/sk1.jpeg",
      title: "The Green Mile",
      description: `The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe's encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book2",
      image: "/images/sk2.jpeg",
      title: "Pet Sematary",
      description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book3",
      image: "/images/sk3.jpeg",
      title: "The Shining",
      description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book1",
      image: "/images/sk1.jpeg",
      title: "The Green Mile",
      description: `The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe's encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book2",
      image: "/images/sk2.jpeg",
      title: "Pet Sematary",
      description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book3",
      image: "/images/sk3.jpeg",
      title: "The Shining",
      description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book2",
      image: "/images/sk2.jpeg",
      title: "Pet Sematary",
      description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book3",
      image: "/images/sk3.jpeg",
      title: "The Shining",
      description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book2",
      image: "/images/sk2.jpeg",
      title: "Pet Sematary",
      description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
    {
      _id: "book3",
      image: "/images/sk3.jpeg",
      title: "The Shining",
      description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
      availableSizes: ["X", "L", "XL", "XXL"],
      price: 29.9,
    },
  ];

  return (
    <div>
      <Fade bottom cascade>
        {!books ? (
          <div>Loading...</div>
        ) : (
          <ul className={classes.books}>
            {books.map((book, key) => (
              <Book book={book} key={key} />
            ))}
          </ul>
        )}
      </Fade>
    </div>
  );
};

export default Books;
