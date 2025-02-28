// Schema、Model、Entity或者Documents的关系:Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 
mongoose.connect('mongodb://127.0.0.1:27017/ProData');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式Schema **************/
const newProblemSchema = mongoose.Schema({
    problem_id: Number,
    title: String,
    content: String,
    option: Object,
    answer: String,
    score: Number,
    type: Number,
    typetext: String,
    location: String,
    context_id: Array,
    exercise_id: String,
    lanuage: String,
});
const problemsSchema = mongoose.Schema({
    id: String,
    title: String,
    content: String,
    option: Object,
    answer: String,
    score: Number,
    type: String,
    typetext: String,
    location: String,
    context_id: Array,
    exercise_id: String,
    lanuage: String,
});
const conceptsSchema = mongoose.Schema({
    id: String,
    name: String,
    totalAttempts: Number,
    acceptedAttempts: Number,
    tscoringRate    : Number,
    accuracy: Number,
    proCount: Number,
    acceptedRate: Number,
});
const userProblemSchema = mongoose.Schema({
    log_id: String,
    problem_id: String,
    user_id:String,
    is_correct:Number,
    attempts:Number,
    score:Number,
    submit_time:String
});

const conceptProblemSchema = mongoose.Schema({
    concept_name: String,
    problem: String,
    conceptId:Number
})

const createdRelSchema = mongoose.Schema({
    problem: String,
    conceptId:String,
    type:String
})

const problemConceptSchema = mongoose.Schema({
    conceptId: String,
    problemId: String
})
const conceptTreeSchema = mongoose.Schema({
    id: String,
    name: String,
    layout:Number,
})

const submissionsSchema = mongoose.Schema({
    id: String,
})
const studentSchema = mongoose.Schema({
    id: String,
})
const proConRelSchema = mongoose.Schema({
    problemId: String,
    conceptId:String,
    type:String
})

const sankeyDataSchema = mongoose.Schema({
    
    source: Number,
    target:Number,
    value: String
})

const proConScatterSchema = mongoose.Schema({
    id: String,
    x:Number,
    y:Number,
    kLab:String,
    name:String
})
const proInConGPTScatterSchema = mongoose.Schema({
    id: String,
    x:Number,
    y:Number,
    kLab:String,
    name:String,
    type:String,
})
const paperSchema = mongoose.Schema({
    id: String,
    number:Number,
    type0:Array,
    type1:Array,
    type2:Array,
    type3:Array,
})
const paperSankeySchema = mongoose.Schema({
    id: String,
    link:Array,
})
/************** 定义模型Model **************/
const Models = {
   
    Concept: mongoose.model('concept', conceptsSchema, 'ent_concept'),
    // UserProblem: mongoose.model('userProblem', userProblemSchema, 'filterDS_user_problem'),
    ConceptTree: mongoose.model('conceptTree', conceptTreeSchema, 'conceptTreeNew'),
    // ConceptProblem: mongoose.model('conceptProblem', conceptProblemSchema, 'filterDS_concept_problem'),
    ProblemConcept: mongoose.model('problemConcept', problemConceptSchema, 'proConRel'),//'problem_concept'),
    // Problem:mongoose.model('problem', problemsSchema, 'problems'),
    Problem:mongoose.model('problem', problemsSchema, 'allProblems'),
    // newProblem:mongoose.model('newProblem', problemsSchema, 'newProblem'),
    
    // newProblem:mongoose.model('newProblem', problemsSchema, 'pp'),
    Student:mongoose.model('student', studentSchema, 'ent_student'),
    Submission:mongoose.model('submission', submissionsSchema, 'submissions'),

    createdRel:mongoose.model('createdRel', createdRelSchema, 'createdRel'),

    
    ProConGPTRel:mongoose.model('proConGPTRel', proConRelSchema, 'proConGPTRel'),
    ProConScatter:mongoose.model('proConScatter', proConScatterSchema, 'conceptGptScatter'),
    ProInConGPTScatter:mongoose.model('proInConGPTScatter', proInConGPTScatterSchema, 'proInConGPTScatter'),

    // SankeyData:mongoose.model('sankeyData', sankeyDataSchema, 'sankeyData'),
    SankeyData:mongoose.model('sankeyData', sankeyDataSchema, 'allProSankeyData'),
    ConceptOri:mongoose.model('conceptOri', conceptsSchema, 'conceptOri'),
    Paper:mongoose.model('paper', paperSchema, 'papers'),
    PaperSankey:mongoose.model('paperSankey', paperSankeySchema, 'paperSankeyData'),

}

module.exports = Models;
