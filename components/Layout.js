import Header from "./Header";
import '../static/css/style.css'

const Layout = ({ children }) => {
  return (
    <>
      <div >
        <Header/>
      </div>
      {children}
       <div className=" pt-3">
       <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12 ">
          <div  style={{color:"white"}}>
            <h3> Mr.Blogger</h3>
            <p>We are working in this indusrty for pretty long time and have gained so much of experience 
              that we can make your development so easy so that you can focus more on your Business
            </p>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-12 ">
          <div>
            
            <div class="container news-letter-main">
              <div class="row">
                <div class="col-lg-12  col-12"> 
                  <div class="input-group mt-4 mb-3">
                    <input type="text" class="form-control news-letter" placeholder="Your Email"/>
                    <div class="input-group-append">
                      <button class="input-group-text">Subscribe</button>
                    </div>
                  </div>  
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
      <div class="mt-2  pb-2 text-center" style={{color:"white"}}>
        <p>Copyright @2020 All Rights Reserved | This website is made with love by Skoll</p>
      </div>
      <div class="scrolltop float-right">
        <i class="fa fa-arrow-up" onclick="topFunction()" id="myBtn"></i>

      </div>
            </div>
    </div>
       
    </>
  );
};

export default Layout;
