function signup(firstname, lastname) {
    const signupfile = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
    
      <link href="css/style.css" rel="stylesheet">
      <link href="fontawesome-free-6.5.1-web/css/brands.css" rel="stylesheet">
      <link href="fontawesome-free-6.5.1-web/css/fontawesome.css" rel="stylesheet">
      <link href="fontawesome-free-6.5.1-web/css/solid.css" rel="stylesheet">
      <link href="fontawesome-free-6.5.1-web/css/regular.css" rel="stylesheet">
      <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
      
      <title>Frontend Mentor | Newsletter sign-up form with success message</title>
    
    </head>
    <body>
    
      <div role="main">
        <div class="main">
          <div class="img-content">
            <div class="sign-up-img"></div>
          </div>
          <div class="sign-up-form">
            <div class="content">
              <!-- Sign-up form start -->
              <h1>Stay updated!</h1>
    
              <h4>Please create your account with us today or <a href="/signin">Sign In</a></h4>
    
              <form class="sign-up-Form" id="form" action="/welcome" method="POST" enctype="multipart/form-data">
              <div class="tab">
              <div class="fullname">    
              <div class="form-content col-50">
                <div class="label">
                  <div class="fn">First name</div> 
                  <div class="erro-r">First name cannot be empty</div>
                </div>
              <input type="text" name="firstname" id="firstname" class="firstname sme but fn-flex" value="${firstname}" placeholder="">
              </div>
              <div class="form-content col-50">
                <div class="label">
                  <div class="ln">Last name</div> 
                  <div class="erro-r">Last name cannot be empty</div>
                </div>
              <input type="text" name="lastname" id="lastname" class="lastname sme but ln-flex" value="${lastname}" placeholder="">
              </div>

              </div>
              </div>

              <div class="tab">
              <div class="form-content">
                <div class="label">
                  <div class="eml">Email address</div> 
                  <div class="erro-r">Valid email</div>
                </div> 
              <input type="email" name="email" id="email" class="email sme but" placeholder="" autocomplete="on">
              </div>
              
              
              <div class="form-content">
                <div class="label">
                  <div class="usn">Username</div>
                  <div class="erro-r">Username cannot be empty</div>
                </div>
              <input type="text" name="username" id="username" class="username sme but" placeholder="" autocomplete="on">
              </div>

              </div>

              <div class="tab">
              <div class="form-content">
                <div class="label">
                  <div class="psw">Password</div> 
                  <div class="erro-r erro-rp"></div>
                </div>
               <div class="sme dpass">
                <div class="col-75">     
              <input type="password" name="password" id="password" class="password sme but fpass" placeholder="">
               </div>
               <div class="col-25">
                <i class="fa-solid fa-eye-slash"></i>
               </div>
               </div>
              </div>

              </div>

               
                  <input type="submit" class="button sme" value="Subscribe">
               <div style="display: flex; justify-content: end;">
                  <div class="sme" id="prevBtn" >Prev</div>
                  <div class="sme" id="nextBtn" >Next</div>
               </div>


              <div style="text-align:center;margin-top:15px;">
                  <span class="step"></span>
                  <span class="step"></span>
                  <span class="step"></span>
              </div>
              </form>
              <!-- Sign-up form end -->
            </div>
          </div>
        </div>
      </div>
      <div class="attribution" role="contentinfo">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://www.ayocodex.site">Ayomide Ojutalayo</a>.
      </div>
    </body>
    <script src="js/script1.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="app.js"></script>
  </html>
    `
    return signupfile;
}

// Path: Newsletter-sign-up/public/js/htmlfiles.js

function successmsg(email, firstname, lastname) {
    const successfile = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
    
      <link href="css/style.css" rel="stylesheet">
      <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
      
      <title>Frontend Mentor | Newsletter sign-up form with success message</title>
    
    </head>
    <body>
    
      <div role="main">
        <!-- Success message start -->
        <div class="success-message" data-wow-delay="0.1s" style=" display: block;">
          <div class="divv">
          <div class="success-message-content">
            <img alt="An Icon Succes Image" src="/assets/images/icon-success.svg">
            <h1>Dear ${firstname} ${lastname},</h1>
            <h2>Thanks for subscribing!</h2>
            <h4>A confirmation email has been sent to <b>${email}</b>. 
              Please open it and click the div inside to confirm your email.</h4>
          </div>
          <div class="success-message-dismiss">
            <div class="button sme">Dismiss message</div>
          </div>
          </div>
          <!-- Pre Loader -->
            <div id="loader" class="show">
                <div class="loader"></div>
            </div>
        </div>
        <!-- Success message end -->
      </div>
      <div class="attribution" role="contentinfo">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://www.ayocodex.site">Ayomide Ojutalayo</a>.
      </div>
    </body>
    <script src="js/script2.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="app.js"></script>
    </html>
    `;
    return successfile;
}

function sign_in() {
  const signfile = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
  
    <link href="css/style.css" rel="stylesheet">
    <link href="fontawesome-free-6.5.1-web/css/brands.css" rel="stylesheet">
    <link href="fontawesome-free-6.5.1-web/css/fontawesome.css" rel="stylesheet">
    <link href="fontawesome-free-6.5.1-web/css/solid.css" rel="stylesheet">
    <link href="fontawesome-free-6.5.1-web/css/regular.css" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
    
    <title>Frontend Mentor | Newsletter sign-up form with success message</title>
  
  </head>
  <body>
  
    <div role="main">
      <div class="main">
        <div class="img-content">
          <div class="sign-up-img"></div>
        </div>
        <div class="sign-up-form">
          <div class="content">
            <!-- Sign-up form start -->
            <h1>Stay updated!</h1>
  
            <h3>Sign in to your account today.</h3>
            <h4>Don't have an account? <a href="/home">Sign Up</a></h4>
  
            <div class="content-info"> 
              <div class="content-list">
                <img src="/assets/images/icon-list.svg" alt="List Icon">
                <h4> Product discovery and building what matters</h4>
              </div>   
              <div class="content-list">
                <img src="/assets/images/icon-list.svg" alt="List Icon">
                <h4> Measuring to ensure updates are a success</h4>
              </div>
              <div class="content-list">
                <img src="/assets/images/icon-list.svg" alt="List Icon">    
                <h4> You can use your email to sign in. Just click on the icon.</h4>
              </div>
            </div>
  
            <form class="sign-up-Form" id="form" action="/signin" method="POST" enctype="multipart/form-data">
             
              <div class="form-content">
                <div class="label">
                  <div class="usn">Username</div> 
                  <div class="erro-r"></div>
                </div>
               <div class="sme dpass">
                <div class="col-75">     
              <input type="text" name="username" id="username" class="username sme but fpass" placeholder="" autocomplete="off" required>
               </div>
               <div class="col-25">
                <i class="fa-solid fa-user"></i>
               </div>
               </div>
              </div>

              <div class="form-content">
                <div class="label">
                  <div class="psw">Password</div> 
                  <div class="erro-r erro-rp"></div>
                </div>
               <div class="sme dpass">
                <div class="col-75">     
              <input type="password" name="password" id="password" class="password sme but fpass" placeholder="" autocomplete="off" required>
               </div>
               <div class="col-25">
                <i class="fa-solid fa-eye-slash"></i>
               </div>
               </div>
              </div>

              <div>
              <input type="submit" class="button sme" value="Subscribe">
              </div>
            </form>
            <!-- Sign-up form end -->
          </div>
        </div>
      </div>
    </div>
    <div class="attribution" role="contentinfo">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
      Coded by <a href="https://www.ayocodex.site">Ayomide Ojutalayo</a>.
    </div>
  </body>
  <script src="js/signup.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="app.js"></script>
</html>
  `
  return signfile;
}

module.exports = {
  signup,
  successmsg,
  sign_in
};