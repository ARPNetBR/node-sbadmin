
module.exports = function( app, passport ){

    app.get("/", (i, o) =>{
        o.render('dummy', {
            title: 'Admin-TPL',
            content: function(){ return 'blank' } 
        });
                    
    })

    app.get("/x", (req, res) => {
      
            // content: function(){ return 'editor'},
            // js: function( ){ return 'js'}
    });

}