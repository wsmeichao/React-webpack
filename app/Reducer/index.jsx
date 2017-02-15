/**
 * 存储登录的用户信息
 * 
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */
const User = (state = JSON.parse(Tool.localItem('User')), action) => {
    console.log("action",action);
    switch (action.type) {
        case 'signinSuccess': //登录成功
            // Tool.localItem('User', JSON.stringify(action.target));
            return action;
        case 'signin': //退出
            Tool.removeLocalItem('User');
            return null;
        default:
            return state;
    }

}
export default { User }