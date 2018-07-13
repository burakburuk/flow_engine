export const rules = [
    {
        "id": 1, "body": function (data) {
            return (data.num1 * data.num2) % 2 === 0;
        }, "true_id": 2, "false_id": 3, title: "Rule 1"
    },
    {
        "id": 2, "body": function (data) {
            return (data.num1 + data.num2) % 2 === 0;
        }, "true_id": 3, "false_id": 4, title: "Rule 2"
    },
    {
        "id": 3, "body": function (data) {
            return (data.num1 - data.num2) >= 0;
        }, "true_id": 4, "false_id": 5, title: "Rule 3"
    },
    {
        "id": 4, "body": function (data) {
            return (data.num1 / data.num2) >= 0 && (data.num1 / data.num2) <= 1;
        }, "true_id": 5, "false_id": 6, title: "Rule 4"
    },
    {
        "id": 5, "body": function (data) {
            return (data.num1 % data.num2) === 0;
        }, "true_id": 6, "false_id": null, title: "Rule 5"
    },
    {
        "id": 6, "body": function (data) {
            return Math.pow(data.num1, data.num2) % 10 === 0;
        }, "true_id": null, "false_id": null, title: "Rule 6"
    }
];