import moment from "moment";
import RenderHTML from "react-render-html";
import Link from "next/link";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  return (
    <div className="card" style={{backgroundColor:"#f7f5ed"}}>
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ height: "250px", width: "100%" }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            ></img> 
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title">{blog.title}</h5>
            </a>
          </Link>
          <p className="card-text">{RenderHTML(blog.excerpt)}</p>
        </section>
      </div>
      <div class="card-body">
        Posted {moment(blog.updatedAt).fromNow()} by
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a className="float-right">{blog.postedBy.username}</a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
