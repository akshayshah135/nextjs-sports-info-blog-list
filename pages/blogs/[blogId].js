import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const getStaticPaths = async () => {

    const response = await fetch("https://backend.sports.info/api/v1/posts/recent");
    const result = await response.json();

    const paths = result.data.map((index) => {
        return {
            params: {
                blogId: index._id.toString(),
            }
        }
    })
    
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.blogId;
    const response = await fetch(`https://backend.sports.info/api/v1/posts/view/${id}`);
    const result = await response.json();
    
    return {
        props: {
            blog: result.data,
        }
    }
}

const blog = ({ blog }) => {
    return <>
        <style jsx>
            {`
                .post-created-at {
                    font-weight: 700
                }
                .link-color {
                    color: #FFFFFF !important;
                    transition: all .4s;
                    border-bottom: 3px solid transparent;
                }
                .link-color:hover {
                    border-bottom: 3px solid #FFFFFF;
                }
                .banner {
                    background-image: url(${blog.sImage}) !important;
                }
            `}
        </style>
        <div className="banner" >
            <div className="container">
                <div className="banner-footer">
                    <div className="blog-title">
                        <h1>{blog.sTitle}</h1>
                    </div>
                    <div className="blog-author-info">
                        <div className="author-info__left">
                            <div className="author-name link-color">
                                <a href="#">
                                    {`${blog.iId.sFirstName} ${blog.iId.sLastName}`}
                                </a>
                            </div>
                            <div className="post-created-at">{blog.dCreatedAt}</div>
                        </div>
                        <div className="author-info__right post-created-at">
                            <div className="comment">&#x2709; {blog.nCommentsCount}</div>
                            <div className="seen">&#x2709; {blog.nViewCounts}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <div className="blog-content">
                <div dangerouslySetInnerHTML={{ __html: blog.sDescription }} />
                
                <div className="blog-source">
                    <p align="right">Source: The source of this content is our cricket news platform <Link href={blog.oSource.sLink}><a className="source">{blog.oSource.sName}</a></Link></p>
                </div>
            </div>
            
            <div className="author-info-footer">
                <div className="author-info-footer__img-container">
                    {/* <img src={`https://media.sports.info/${blog.iId.sProfilePicture}`} /> */}
                    <Image src={`https://media.sports.info/${blog.iId.sProfilePicture}`} width="96" height="96" />
                </div>

                <div className="author-info-footer__content-top">
                    <div className="content-top__author-name">
                        <h5>
                            <a href="">{`${blog.iId.sFirstName} ${blog.iId.sLastName}`}</a>
                        </h5>
                    </div>

                    <div className="content-bottom__author-description">
                        <p>{blog.iId.sBio}</p>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default blog;