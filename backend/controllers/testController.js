let users = [
    {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        age: 25,
        country: "USA"
    },
    {
        id: 2,
        username: "jane_smith",
        email: "jane@example.com",
        age: 30,
        country: "Canada"
    },
    {
        id: 3,
        username: "mike_jones",
        email: "mike@example.com",
        age: 28,
        country: "UK"
    },
    {
        id: 4,
        username: "sara_williams",
        email: "sara@example.com",
        age: 22,
        country: "Australia"
    },
    {
        id: 5,
        username: "alex_brown",
        email: "alex@example.com",
        age: 35,
        country: "Germany"
    },
    {
        id: 6,
        username: "emily_taylor",
        email: "emily@example.com",
        age: 27,
        country: "France"
    },
    {
        id: 7,
        username: "david_clark",
        email: "david@example.com",
        age: 40,
        country: "Spain"
    },
    {
        id: 8,
        username: "lisa_martin",
        email: "lisa@example.com",
        age: 32,
        country: "Italy"
    },
    {
        id: 9,
        username: "peter_anderson",
        email: "peter@example.com",
        age: 29,
        country: "Brazil"
    },
    {
        id: 10,
        username: "sophia_johnson",
        email: "sophia@example.com",
        age: 26,
        country: "India"
    }
];

exports.test = async (req, res) => {
  return res.status(200).json({ data: users });
};
