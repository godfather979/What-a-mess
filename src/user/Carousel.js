import { useState } from "react";
import "./Carousel.css";

const items = [
  {
    title: "Caffe Latte, a new product",
    price: "$ 20",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.",
    bgColor: "linear-gradient(to right, #3b82f6, #06b6d4)",
  },
  {
    title: "Strawberry mocha, a new product",
    price: "$ 20",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.",
    bgColor: "linear-gradient(to right, #3b82f6, #06b6d4)",
  },
  {
    title: "Doppio espresso, a new product",
    price: "$ 20",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.",
    bgColor: "linear-gradient(to right, #3b82f6, #06b6d4)",
  },
  {
    title: "Matcha latte macchiato, a new product",
    price: "$ 20",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores labore animi voluptatibus sequi illo, earum molestias explicabo officiis iste neque? Quis quod eligendi fugit, dolore nam itaque modi exercitationem voluptatem corrupti aut aspernatur. Quos non in sed ratione tenetur harum.",
    bgColor: "linear-gradient(to right, #3b82f6, #06b6d4)",
  },
];

export default function Carousel() {
  const [active, setActive] = useState(1);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="carousel">
      <div className="list">
        {items.map((item, index) => (
          <article
            key={index}
            className={`item ${index === active ? "active" : ""}`}
          >
            <div
              className="main-content centered"
              style={{ background: item.bgColor }}
            >
              <div className="content">
                <h2>{item.title}</h2>
                <p className="price">{item.price}</p>
                <p className="description">{item.description}</p>
                <button className="addToCart">Add To Cart</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="arrows">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </section>
  );
}
