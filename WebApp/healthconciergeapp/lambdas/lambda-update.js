const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  console.log(event.body);
  const data = JSON.parse(event.body);
  //const data = JSON.stringify(event.body, null, 2);
  console.log(data);

  const params = {
    TableName: process.env.TABLE_NAME, //[ProjectName],
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'goalId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      goalId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET name = :name, age = :age, weight = :weight, height = :height, bloodtype = :bloodtype",
    ExpressionAttributeValues: {
      ":name": data.name ? data.name :null,
      ":age": data.age ? data.age : null,
      ":weight": data.weight ? data.weight : null,
      ":height": data.height ? data.height : null,
      ":bloodtype": data.bloodtype ? data.bloodtype : null
    },
    ReturnValues: "ALL_NEW"
  };

  dynamoDb.update(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials" : true
    };

    // Return status code 500 on error
    if (error) {
      console.log(error);
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ status: true })
    };
    callback(null, response);
  });
};