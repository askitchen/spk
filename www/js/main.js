// Dom7
var $$ = Dom7;

var pictureSource = null;
var destinationType = null;

var app = new Framework7({
  root: '#app',
  name: 'ASKITCHEN',
  id: 'com.app.ask.spk',
  init: true,
  initOnDeviceReady: true,
  
  touch: {
    disableContextMenu: false,
  },
  
  // App root data
  data: function () {
    return {
      // db: null,
      user: null,
      password: null,
      currentDate: null,
      bLogedIn: false,
      // token: null,

      endpoint: 'https://askitchen.com/api/spk/'
    };
  },
  // App root methods
  methods: {
    // uploadFoto: function (dn) {
    // }
  },
  on: {

    init: function () { // sama dengan onDeviceReady
      // pictureSource = navigator.camera.PictureSourceType;
      // destinationType = navigator.camera.DestinationType;

      var imageData = localStorage.getItem('profile');
      if (imageData) {
        $$('img.responsive.profile').attr('src', "data:image/jpeg; base64," + imageData);
      }
    }
  },      
  routes: [
    // Add your routes here
    {
      path: '/',
      url: './index.html',  
      tabs: [
        {
          path: '/',
          id: 'tab1',
          async(routeTo, routeFrom, resolve, reject) {      

            if (app.data.bLogedIn) {

              // Show Preloader
              app.preloader.show();
        
              
              if (!app.data.currentDate) {
      
                var now = new Date();
                
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                
                var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
                app.data.currentDate = today;
              }
                      
              var url = app.data.endpoint + app.data.user;
              
              app.request.getJSON(encodeURI(url), {/* Your param if set */}, function (data) {

                // console.log(data)
                app.preloader.hide();
                resolve({ 
                  componentUrl: './pages/sj1.html'
                },
                {
                  context: {
                    data: data.data,
                  }
                });
              });
            }
          }
        },
        {
          path: '/tab2/',
          id: 'tab2',
          async(routeTo, routeFrom, resolve, reject) {      

            // Show Preloader
            app.preloader.show();
        
            
            if (!app.data.currentDate) {
      
              var now = new Date();
              
              var day = ("0" + now.getDate()).slice(-2);
              var month = ("0" + (now.getMonth() + 1)).slice(-2);
              
              var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
              app.data.currentDate = today;
            }
      
            var url = app.data.endpoint + 'proses/' + app.data.user;

            app.request.getJSON(encodeURI(url), {/* Your param if set */}, function (data) {
              
              // console.log(data)
              app.preloader.hide();
              resolve({
                componentUrl: './pages/sj2.html'
              },
              {
                context: {
                  data: data.data,
                }
              });
            });
          }
        },
      ],
      // Page Events
      on: {
        
        pageInit: function(e, page) {
          
          if (!app.data.currentDate) {
      
            var now = new Date();
            
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            app.data.currentDate = today;
          }

          // var today = new Date();

          // $$('#tgltrx').val(today);
          // $$('#tgltrx2').val(today);
          
          $$('.btn-refresh').on('click', function () {
            app.views.main.router.refreshPage();
          });

        }
      }
    },
    {
      path: '/upload-start/:spkid',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;

        // User ID from request
        var spkid = decodeURIComponent(routeTo.params.spkid);
        // console.log('after decode: '+spkid)

        // Show Preloader
        // app.preloader.show();

        // app.request.getJSON(url), {/* Your param if set */}, function (data) {

        //   console.log('data from upload: ' + data)
        //   app.preloader.hide();
          resolve({ 
            componentUrl: './pages/upload1.html'
          },
          {
            context: { spkid: spkid }
          });
        // };
      }
    },
    {
      path: '/upload-finish/:spkid',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;

        // User ID from request
        var spkid = decodeURIComponent(routeTo.params.spkid);
        // console.log('after decode: '+spkid)

        // Show Preloader
        // app.preloader.show();

        // app.request.getJSON(url), {/* Your param if set */}, function (data) {

        //   console.log('data from upload: ' + data)
        //   app.preloader.hide();
          resolve({ 
            componentUrl: './pages/upload2.html'
          },
          {
            context: { spkid: spkid }
          });
        // };
      }
    },
    
  ],
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

var mainView = app.views.create('.view-main');

// Login Screen
$$('#my-login-screen .login-button').on('click', function () {
  
  var user = $$('#my-login-screen [name="usr"]').val();
  if (user == '') {
      app.dialog.alert('Masukkan data user.', 'Login User');
      return;
  }

  var password = $$('#my-login-screen [name="pwd"]').val();
  if (password == '') {
      app.dialog.alert('Masukkan password.', 'Login User');
      return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.login-form');

  // var regId = localStorage.getItem('RegId');
  // formData.gcmid = regId;

  
  app.request.post( app.data.endpoint + 'login', formData, function (res) {
    
    app.preloader.hide();
    
    // console.log(res)
    var data = JSON.parse(res);

    // if (data.message == 'Logged In') {
    if (data.status == true) {
      // console.log('Active user: '+ data.full_name)
    
      localStorage.setItem('user', user);
      // localStorage.setItem('password', password);
      // console.log('Current user: '+user)

      app.loginScreen.close('#my-login-screen');
      
      app.data.bLogedIn = true;
      app.data.user     = user;
      app.data.password = password;
      // app.data.token = data.token;
      
      // display driver name
      $$('.member-name').text(data.full_name);

      // kosongkan isian nomor pin
      $$('#my-login-screen [name="pwd"]').val('');
      
      app.router.navigate('/', {
        reloadCurrent: true,
        ignoreCache: true,
      });
    } else {
      app.dialog.alert(data.message, 'Login User');
    }
  },
  function (xhr, status) {
    
    app.preloader.hide();
    app.dialog.alert('Invalid user!', 'Login User');
  });
});

$$('#my-login-screen').on('loginscreen:opened', function (e, loginScreen) {
  // set data ke form login
  $$('#my-login-screen [name="usr"]').val(localStorage.getItem('user'));
  // console.log('Login screen open')
  // console.log('Current user: '+localStorage.getItem('user'))
});

$$('.profile-picture').on('click', function (e) {
            
  var options = {
    quality: 50,
    destinationType: destinationType.DATA_URL,
    sourceType: pictureSource.CAMERA,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    targetWidth: 100,
    targetHeight: 100,
    allowEdit: true,
    correctOrientation: true  //Corrects Android orientation quirks
    // popoverOptions: CameraPopoverOptions,
    // saveToPhotoAlbum: false
  };

  // update camera image directive
  navigator.camera.getPicture(function cameraSuccess(imageData) {
    $$('img.responsive.profile').attr('src', "data:image/jpeg; base64," + imageData);
    localStorage.setItem('profile', imageData);
  }, function cameraError(err) {
    // console.log('Failed because: ');
    app.dialog.alert(err);
  }, options);
});

$$(document).on('backbutton', function (e) {

  e.preventDefault();
  
  // for example, based on what and where view you have
  var leftp  = app.panel.left && app.panel.left.opened;
  var rightp = app.panel.right && app.panel.right.opened;
  
  if (leftp || rightp) {

      app.panel.close();
      return false;
  } else
  if ($$('.modal-in').length > 0) {

      app.dialog.close();
      app.popup.close();
      
      // app.dialog.alert('Current url: '+app.views.main.router.url);
      navigator.app.exitApp();
      // return false;
  } else

  if (app.views.main.router.url == '/' || app.views.main.router.url == '/tab2/' ||
    app.views.main.router.url == '/android_asset/www/index.html') {
    
      if (app.data.bLogedIn) {
        app.request.post(app.data.endpoint + 'logout', [], function (res) {
          navigator.app.exitApp();
        });
      } else
        navigator.app.exitApp();
    }
});

app.on('pageInit', function (page) {

  $$('input').on('focus', function () {
    
    $$('.kb').css('height', '280px');
    //var limit = $$(window).height() - 280;

    if ($$(this).offset().top > 280) {
      $$('.page-content').scrollTop($$(this).offset().top-168);
    }
  });

  $$('input').on('blur', function () {
    $$('.kb').css('height', '0px');
  });
});