import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await res.json();
        setCollections(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <div className="col-lg-12">
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {new Array(4).fill(0).map((_, i) => (
                  <div className="nft_coll" key={i}>
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" borderRadius="10px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="120px" height="20px" borderRadius="4px" />
                      <br />
                      <Skeleton width="60px" height="14px" borderRadius="4px" />
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          ) : (
            <div className="col-lg-12" data-aos="fade-up">
              <OwlCarousel className="owl-theme" {...carouselOptions}>
                {collections.map((item) => (
                  <div className="nft_coll" key={item.id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details?nftId=${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author?author=${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/explore`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
