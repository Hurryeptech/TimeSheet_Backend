class Apifeatures 
{
    constructor(query,queryStr)
    {
        this.query = query
        this.queryStr = queryStr
    }

    search()
    {
        const query = this.queryStr.keyword ? 

        {
            userEmail:{
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } :{}

        this.query.find({...query},{userEmail: 1})
        return this
    }
    
   
}

module.exports = Apifeatures