const getUsers = async (req, res, next) => {

    try {

        let query = "SELECT * FROM users"
        let values = []
        let conditions = []

        if (req.query.name) {
            conditions.push("name LIKE ?")
            values.push(`%${req.query.name}%`)
        }

        if (req.query.role) {
            conditions.push("role LIKE ?")
            values.push(`%${req.query.role}%`)
        }

        if (conditions.length) {
            query += " WHERE " + conditions.join(" AND ")
        }

        const [users] = await db.query(query, values)

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })

    } catch (err) {

        next(err)

    }
}