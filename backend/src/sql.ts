export const SELECT_GAME_BY_NAME = 'select gid, name from game where name like ? order by name limit ? offset ?'
export const SELECT_GAME_SUMMARY = 'select gid, name from game order by name limit ? offset ?'
export const SELECT_GAME_BY_GID = 'select * from game where gid = ?'
export const SELECT_GAME_COUNT = 'select count(gid) as game_cnt from game'
export const SELECT_COMMENTS_SUMMARY_BY_GID = 'select c_id,gid,user from comment where gid = ? limit ? offset ?'
export const SELECT_COMMENTS_BY_CID = 'select * from comment where c_id = ?'
export const SELECT_COMMENTS_BY_GID_COUNT = 'select count(c_id) as comment_cnt from comment where gid = ?'