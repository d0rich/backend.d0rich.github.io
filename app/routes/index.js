const done_task_routes = require('./done_task_routes');
const comment_task_routes = require('./add_comment_routes')

const get_vk_users_info = require('./get_users_vk_info');

const get_member_routes = require('./get_member_routes');
const get_subjects_routes = require('./get_subjects_routes');
const get_tom_routes = require('./get_tom_routes');
const get_task_routes = require('./get_task_routes');
const get_members_routes = require('./get_members_routes');
const get_subject_toms_routes = require('./get_subject_toms_routes');
const get_tom_tasks_routes = require('./get_tom_tasks_routes');

const add_member_routes = require('./add_member_routes');
const add_subject_routes = require('./add_subject_routs');
const add_tom_task_routes = require('./add_tom_task');
const add_subject_toms_routes = require('./add_subject_toms_routes');

const del_subject_routes = require('./del_subject_routes')
const del_tom_routes = require('./del_tom_routes')
const del_task_routes = require('./del_task_routes')
const del_member_routes = require('./del_member_routes')

module.exports = function(app, db) {   

  add_subject_routes(app,db);
  add_subject_toms_routes(app,db);
  add_tom_task_routes(app,db);
  add_member_routes(app,db);

  get_member_routes(app,db);
  get_subjects_routes(app,db);
  get_tom_routes(app,db);
  get_task_routes(app,db);
  get_subjects_routes(app,db);
  get_members_routes(app,db);
  get_subject_toms_routes(app,db);
  get_tom_tasks_routes(app,db);

  done_task_routes(app,db);
  comment_task_routes(app,db);

  get_vk_users_info(app,db);

  del_subject_routes(app,db);
  del_tom_routes(app,db);
  del_task_routes(app,db);
  del_member_routes(app,db);
 
};
