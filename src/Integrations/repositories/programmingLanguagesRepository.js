const helper = require('./helpers/helper');
const programmingLanguagesQueries = require('../database/queries/programmingLanguangesQueries');


function getAllLanguangesRepository(){

    const rows = programmingLanguagesQueries.getAllLanguangesQuery();

    const data = helper.emptyOrRows(rows);

    return data;
};


function createProgramingLanguageRepository(props){

    const result = programmingLanguagesQueries.createProgramingLanguageQuery(props);

    let message = 'Error in creating programming language';

    if (result != undefined) {
    message = 'Programming language created successfully';
    };

    return {message};
};


function updateLanguageRepository(id, props){

    const result = programmingLanguagesQueries.updateLanguageQuery(id, props);

    let message = 'Error in updating programming language';

    if (result != undefined) {
        message = 'Programming language updated successfully';
    };

    return {message};
};


function deleteLanguageRepository(id){

    const result = programmingLanguagesQueries.deleteLanguageQuery(id);

    let message = 'Error in deleting programming language';
  
    if (result != undefined) {
      message = 'Programming language deleted successfully';
    }
  
    return {message};
};


module.exports = {
    getAllLanguangesRepository,
    createProgramingLanguageRepository,
    updateLanguageRepository,
    deleteLanguageRepository
};