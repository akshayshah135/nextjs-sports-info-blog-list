import Link from "next/link";
import Image from 'next/image';

const BlogListCard = ({data}) => {
    return <>
    <div className="blog-list">
            <div className="blog-image">
                <Link href={`/blogs/${data._id}`}>
                <a>
                    <div className="blog-img-container">
                        <Image src={data.sImage} width="280" height="175" />
                    </div>
                </a>
                </Link>
            </div>
            <div className="blog-content">
                <div className="blog-heading">
                    <h5 className="heading-color">
                        <Link href={`/blogs/${data._id}`}>
                            <a>{data.sTitle}</a>
                        </Link>
                    </h5>
                    <Link href={`/blogs/${data._id}`}>
                        <a><p className="paragraph-color">{data.sDescription}</p></a>
                    </Link>
                </div>
                <div className="author-info">
                    <div className="author-info__left">
                        <div className="author-name link-color">
                            <Link href={`/blogs/${data._id}`}>
                                <a>{data.iId.sFirstName} {data.iId.sLastName}</a>
                            </Link>
                        </div>
                        <div className="post-created-at">{ data.dCreatedAt }</div>
                    </div>
                    <div className="author-info__right post-created-at">
                        <div className="comment">&#x2709; {data.nCommentsCount}</div>
                        <div className="seen">&#x2709; {data.nViewCounts}</div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
 
export default BlogListCard;