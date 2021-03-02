/**
 * @fileoverview funciones complementarias
 * 
 * @version 1.0
 * 
 * @author Andres Gutierrez <andresg206@gmail.com>
 * 
 * History:
 * 1.0 - Version principal
 */

const helper = {    
    /**
     * Funcion para obtener la edad del usuario
     * @param {*} birthday 
     */
    getAge:(birthday) => {
        let today = new Date();
        let birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }
        return age;
    }
}

module.exports = helper;