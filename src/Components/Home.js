import React, { useEffect, useState } from "react";
import Itemcard from "./Itemcard";
import SearchBar from "./searchbar";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("https://643918404660f26eb1aa3099.mockapi.io/data")
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (query) => {
    const results = productData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>

      <section className="py-4">
      <div className="row search_bar">
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            {(searchResults.length > 0 ? searchResults : productData).map(
              (item, index) => (
                <Itemcard
                  img={item.img} 
                  title={item.title}
                  id={item.id}
                  desc={item.desc}
                  price={item.price}
                  key={index}
                  item={item}
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
