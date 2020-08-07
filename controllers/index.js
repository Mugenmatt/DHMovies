
module.exports = {

    index : function(req, res) {
        res.render('index', { title: 'DH Movies Challenge' });
    },

    detail : function(req, res) {
        res.render('detail')
    }

}