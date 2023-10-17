class Graph {
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    addVertexArrayObjects(coursesArray) {

        for (let course of coursesArray) {
            const courseObject = {
                courseCode: course.courseCode,
                courseName: course.courseName,
                coursePeriod: course.studyPeriod,
                courseTerm: course.term,
                courseStatus: 0};

            // TODO: Initialize the first courses with status: 1
            // I should change this to the courses of the first period instead of hard coding it
            // status 0: locked, status 1: unlocked, status 2: passed
            if(courseObject.courseCode === 'DIT023' || courseObject.courseCode === 'DIT043')
            {
                courseObject.courseStatus = 1;
            }
            // Add the current course as a key
            this.addVertex(courseObject);

            // Add dependencies
            let dependencies = course.dependencies;
            for (let dependency of dependencies)
            {
                this.addEdge(courseObject, dependency);
            }
        }
    }

    addVertex(v)
    {
        this.AdjList.set(v, []);
    }

    addEdge(v, w)
    {
        // Directed graph so we only add this direction
        this.AdjList.get(v).push(w);
    }

    printObjectGraph()
    {
        let get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (let i of get_keys)
        {
            // get the adjacency list
            let get_values = this.AdjList.get(i);
            let conc = "";

            for (let j of get_values)
            {
                conc += j + " ";
            }
            // For testing only:
            // console.log(i.courseCode + " -> " + conc);
        }
    }

    getAdjList()
    {
        return this.AdjList;
    }
}

export default Graph;