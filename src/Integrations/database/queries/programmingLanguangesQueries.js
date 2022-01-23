const dbConnection = require('../setup/dbConnection');


function getAllLanguangesQuery () {

    const result = dbConnection.query(
    `SELECT 
        id, 
        name,
        released_year,
        githut_rank, 
        pypl_rank,
        tiobe_rank 
    FROM 
        programming_languages`);

    return result;
};


function createProgramingLanguageQuery(props){

    const result = dbConnection.query(
        `INSERT INTO programming_languages 
            (name, 
            released_year, 
            githut_rank, 
            pypl_rank, 
            tiobe_rank) 
        VALUES 
            (?, ?, ?, ?, ?)`, 
        [
            props.name, props.released_year,
            props.githut_rank, props.pypl_rank,
            props.tiobe_rank
        ]
    );
    
    return result;
};


function updateLanguageQuery(id, props){

    const result = dbConnection.query(
        `UPDATE programming_languages 
        SET name=?, 
            released_year=?, 
            githut_rank=?, 
            pypl_rank=?, 
            tiobe_rank=? 
        WHERE 
            id=?`, 
        [
            props.name, props.released_year,
            props.githut_rank, props.pypl_rank,
            props.tiobe_rank, id
        ]
    );

    return result;

};


function deleteLanguageQuery(id){

    const result = dbConnection.query(
        `DELETE FROM programming_languages 
        WHERE 
            id=?`, 
        [id]
    );

    return result;
};


module.exports = {
    getAllLanguangesQuery,
    createProgramingLanguageQuery,
    updateLanguageQuery,
    deleteLanguageQuery
};