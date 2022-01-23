const db = require('../../Integrations/database/setup/dbConnection');
const helper = require('../helpers/serviceHelper');
const config = require('../../Integrations/database/setup/dbConfig');

const programmingLanguagesRepository = require('../../Integrations/repositories/programmingLanguagesRepository');


async function getMultipleAsync(page = 1){

  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await programmingLanguagesRepository.getAllLanguangesRepository();
  const meta = {page};

  return {
    rows,
    meta
  }
};


async function createAsync(programmingLanguage){

    const result = await programmingLanguagesRepository.createProgramingLanguageRepository(programmingLanguage);

    return result;
};

  
async function updateAsync(id, programmingLanguage){
  
  const result = await programmingLanguagesRepository.updateLanguageRepository(id, programmingLanguage);

  return result;
};
  

async function deleteAsync(id){

    const result = await programmingLanguagesRepository.deleteLanguageRepository(id);

    return result;
};
  

module.exports = {
  getMultipleAsync,
  createAsync,
  updateAsync,
  deleteAsync
};