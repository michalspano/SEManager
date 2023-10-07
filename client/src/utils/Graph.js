class Graph {
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }

    addVertexArray(coursesArray)
    {
        // console.log(coursesArray);
        
        // Get the course codes
        for (var course of coursesArray) {
            
            // Add the current courseCode as a key in the Graph
            let courseCode = course.courseCode;
            this.addVertex(courseCode);

            // Add the dependencies
            let dependencies = course.dependencies;
            for (var dependency of dependencies)
            {
                this.addEdge(courseCode, dependency);
            }
        }
    }

    addVertexArrayObjects(coursesArray) {

        for (var course of coursesArray) {
            const courseObject = {courseCode: course.courseCode, courseName: course.courseName, courseStatus: 0};

            // Add the current course as a key
            this.addVertex(courseObject);

            // Add dependencies
            let dependencies = course.dependencies;
            for (var dependency of dependencies)
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

    printGraph()
    {
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys)
        {
            // get the adjacency list
            var get_values = this.AdjList.get(i);
            var conc = "";

            for (var j of get_values)
            {
                conc += j + " ";
            }

            console.log(i + " -> " + conc);
        }
    }

    printObjectGraph()
    {
        var get_keys = this.AdjList.keys();

        // iterate over the vertices
        for (var i of get_keys)
        {
            // console.log(i.courseCode);
            // get the adjacency list
            var get_values = this.AdjList.get(i);
            var conc = "";

            for (var j of get_values)
            {
                conc += j + " ";
            }

            console.log(i.courseCode + " -> " + conc);
        }
    }

    getAdjList()
    {
        return this.AdjList;
    }
}

export default Graph;