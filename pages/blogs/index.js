import React, { useState } from 'react';
import BlogListCard from '../../components/BlogListCard';

export const getStaticProps = async () => {
    const response = await fetch("https://backend.sports.info/api/v1/posts/recent");
    const result = await response.json();
    
    return {
        props: {
            blogs: result.data,
        }
    }
}

const Home = ({ blogs }) => {
    const loadMore = () => {
        const response = fetch("https://backend.sports.info/api/v1/posts/recent", {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "nStart": 4,
                "nLimit": 4,
                "eSort": "Latest",
                "bRemoveBannerPosts": true
            })
        }).then((response) => {
            console.log(response);
        })
    }

    return (
        <>
            <div className="container">
                <div className="blog-list-container">
                   { blogs.map((index) => {
                       return <BlogListCard key={index._id} data={index} />
                   }) }

                    <div className="load-more-container">
                        <button onClick={() => loadMore()} className="load-more">Load More <span></span></button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Home;