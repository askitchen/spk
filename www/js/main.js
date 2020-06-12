// Dom7
var $$ = Dom7;

var pictureSource = null;
var destinationType = null;

var app = new Framework7({
  root: '#app',
  id: 'io.framework7.ask.spk',
  name: 'ASKITCHEN',
  init: true,
  initOnDeviceReady: true,
  
  touch: {
    disableContextMenu: false,
  },
  
  // App root data
  data: function () {
    return {
      db: null,
      spkid: null,
      // kode: null,
      user: null,
      password: null,
      currentDate: null,
      bLogedIn: false,
      push: null,
      // token: null,

      endpoint: 'https://askitchen.com/api/spk/'
      // endpoint: 'http://localhost/askitchenweb/api/spk/'
    };
  },
  // App root methods
  methods: {
    // uploadFoto: function (dn) {
    // }
  },
  on: {

    init: function () { // sama dengan onDeviceReady
      pictureSource = navigator.camera.PictureSourceType;
      destinationType = navigator.camera.DestinationType;

      var imageData = localStorage.getItem('profile');
      if (imageData) {
        $$('img.responsive.profile').attr('src', "data:image/jpeg; base64," + imageData);
      }
    
      /*
      this.data.push = PushNotification.init({
        "android": {},
        "browser": {
          "pushServiceURL": "http://push.api.phonegap.com/v1/push"
        },
        "ios": {
            "sound": true,
            "vibration": true,
            "badge": true
        },
        "windows": {}
      });

      var push = this.data.push;

      push.on('registration', function(data) {

        app.dialog.alert('RegId: ' + data.registrationId);
        var oldRegId = localStorage.getItem('RegId');
        if (oldRegId !== data.registrationId) {
            // Save new registration ID
            localStorage.setItem('RegId', data.registrationId);
            // Post registrationId to your app server as the value has changed
            // app.dialog.alert('Registrasi Id berhasil!');
        }

      });

      push.on('notification', function(data) {
        
        var db = app.data.db;
    
        if (db) {
          
          var now = new Date();
          var date = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
          var time = now.getHours() + ":" + now.getMinutes()
          
          db.transaction(function(tx) {
              db.transaction(function(tx) {
                tx.executeSql('insert into notifikasi (tgl, jam, info) values (?, ?, ?);', [date, time, data.message]);
              }, function(error) {
                app.dialog.alert('insert error: ' + error.message);
              });
          });
        }
      
        // show message
        app.dialog.alert(data.message, 'SPK');
      }); //*/
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
      path: '/upload-finish/:spkid/:visit',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;

        // User ID from request
        var spkid = routeTo.params.spkid;
        var visit = routeTo.params.visit;
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
            context: { spkid: spkid, visit: visit }
          });
        // };
      }
    },
    {
      path: '/spk-detail/:spkid',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;

        // User ID from request
        var spkid = routeTo.params.spkid;

        // Show Preloader
        app.preloader.show();
        
        var url = app.data.endpoint + 'spk-detail/' + spkid;

        app.request.getJSON(url, {/* Your param if set */}, function (data) {

          // console.log(data)
          app.preloader.hide();
          console.log(data)
          
          resolve({ 
            componentUrl: './pages/spk-detail.html'
          },
          {
            context: { 
              spkid: spkid,
              by_spart: data.by_spart,
              tot_spart: data.tot_spart,
              by_kunjung: data.by_kunjung,
              tot_bknjg: data.tot_bknjg,
              by_service: data.by_service,
              tot_bsvc: data.tot_bsvc
            }
          });
        });
      }
    },
    {
      path: '/spk-part/:spkid',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;

        // User ID from request
        var spkid = routeTo.params.spkid;

        // Show Preloader
        app.preloader.show();
        
        var url = app.data.endpoint + 'spk-detail/' + spkid;

        app.request.getJSON(url, {/* Your param if set */}, function (data) {

          // console.log(data)
          app.preloader.hide();
          
          resolve({ 
            componentUrl: './pages/spk-part.html'
          },
          {
            context: { 
              spkid: spkid,
              by_spart: data.by_spart,
              tot_spart: data.tot_spart,
              by_kunjung: data.by_kunjung,
              tot_bknjg: data.tot_bknjg,
              by_service: data.by_service,
              tot_bsvc: data.tot_bsvc
            }
          });
        });
      }
    },
    {
      path: '/search/',
      componentUrl: './pages/search.html',
    },
    {
      path: '/spart-non/:spkid',
      // componentUrl: './pages/add-spart-non.html',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;

        // User ID from request
        var spkid = routeTo.params.spkid;
          
        resolve({ 
          componentUrl: './pages/add-spart-non.html'
        },
        {
          context: { spkid: spkid }
        });
      }
    },
    {
      path: '/spart-lap/:spkid',
      // componentUrl: './pages/add-spart-lap.html',
      async: function (routeTo, routeFrom, resolve, reject) {
        // Router instance
        var router = this;
  
        // App instance
        var app = router.app;

        // User ID from request
        var spkid = routeTo.params.spkid;
          
        resolve({ 
          componentUrl: './pages/add-spart-lap.html'
        },
        {
          context: { spkid: spkid }
        });
      }
    },
  ],
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

var mainView = app.views.create('.view-main');


var ac_spart = app.actions.create({
  buttons: [
    {
      text: 'Sparepart ASKITCHEN',
      onClick: function () {
        
        app.router.navigate('/search/', {
          reloadCurrent: true,
          ignoreCache: true,
        });
      }
    },
    {
      text: 'Sparepart Non ASKITCHEN',
      onClick: function () {
        
        // console.log(app.data.spkid)
        app.router.navigate('/spart-non/'+app.data.spkid, {
          reloadCurrent: true,
          ignoreCache: true,
        });
      }
    },
    {
      text: 'Sparepart Lapangan',
      onClick: function () {
        
        // console.log(app.data.spkid)
        app.router.navigate('/spart-lap/'+app.data.spkid, {
          reloadCurrent: true,
          ignoreCache: true,
        });
      }
    },
    {
      text: 'Cancel',
      color: 'red',
      // onClick: function () {
      //   app.dialog.alert('Cancel clicked')
      // }
    },
  ]
});

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
  
  var gcmid = localStorage.getItem('RegId');
  
  app.preloader.show();

  var formData = app.form.convertToData('.login-form');
  formData.gcmid = gcmid;

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
      // app.data.password = password;
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

  $$('input, #info').on('focus', function () {
    
    $$('.kb').css('height', '280px');
    //var limit = $$(window).height() - 280;

    if ($$(this).offset().top > 280) {
      $$('.page-content').scrollTop($$(this).offset().top-168);
    }
  });

  
  $$('input, #info').on('blur', function () {
    $$('.kb').css('height', '0px');
  });
});
