class ApiFeature{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr
    }
    search(){
        const keyword=this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i",

            },
        }:{};
        this.query=this.query.find({...keyword})
        return this;
    }
    filter(){
        const querycopy={...this.querystr}
        //Removing field for category
        const removeField=["keyword","page","limit"]
        removeField.forEach(key=>delete querycopy[key])
        
        // filter for price
        let querystr=JSON.stringify(querycopy)
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)


        this.query=this.query.find(JSON.parse(querystr))
        
        return this;
        
    }
    pagination(resultprPage){
     const currentPage=Number(this.querystr.page) ||1;
     
    const skip=resultprPage* (currentPage-1);

    this.query=this.query.limit(resultprPage).skip(skip)
    
    return this;
    }
}
module.exports=ApiFeature