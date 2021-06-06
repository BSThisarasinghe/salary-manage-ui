import ScreenLevelAccess from '../screen-level-access'

const isAuthorized = (auth, screen) => {

    let requiredRoles = ScreenLevelAccess[screen];
    let role;

    //console.log('isAuthorized');

    if (requiredRoles === undefined || requiredRoles.length < 0) {
        return false;
    }

    for (role of requiredRoles) {
        if (auth.roles.includes(role)) {
            return true;
        }
    }

    for (role of requiredRoles) {
        if (auth.realmRoles.includes(role)) {
            return true;
        }
    }

    return false;
}

export default {
    isAuthorized
}