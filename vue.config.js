module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/studentCoursePlan/',
  transpileDependencies: ['vuetify'],
};
