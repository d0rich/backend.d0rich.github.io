const test_reg_routes = require('./test_reg_routes');
const create_employee_routes = require('./create_employee_routes')
const create_task_routes = require('./create_task_routes')
const get_task_routesDublicate = require('./get_task_routesDublicate')
const get_task_routes = require('./get_task_routes')
const get_active_task_routes = require('./get_active_task_routes')
const set_task_routes = require('./set_task_routes')
const set_new_active_task_routes = require('./set_new_active_task_routes')


const set_routes = require('./set_routes');
const delete_routes = require('./delete_routes');

const check_routes = require('./check_routes');
const get_post_routes = require('./get_post_routes');
module.exports = function(app, db) {
  test_reg_routes(app,db);
  create_employee_routes(app,db);
  create_task_routes(app,db);
  get_task_routes(app,db);
  // get_task_routesDublicate(app,db);
  get_active_task_routes(app,db);
  set_task_routes(app,db);
  set_new_active_task_routes(app,db);

  set_routes(app,db);
  delete_routes(app,db);
  
  check_routes(app, db);
  get_post_routes(app, db);
  // Тут, позже, будут и другие обработчики маршрутов 
};
