const Order = require("../models/Order");


class orderController{
    async newOrder(req, res) {
        const newOrder = new Order(req.body);

        try {
            const savedOrder = await newOrder.save();
            res.status(201).json({status: true, message: "Заказ успешно добавлен" },savedOrder);
        } catch (err) {
            res.status(500).json({
                status: false,
                error: 'Internal Server Error',
                message: 'Failed to create order'
            })
        }
    }
    async updatedOrder(req, res){
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(201).json({status: true, message: "Заказ успешно обновлен" },updatedOrder);
        } catch (err) {
            res.status(500).json({
                status: false,
                error: 'Internal Server Error',
                message: 'Failed to update order'
            })
        }
    }

    async deleteOrder(req, res){
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(201).json({status: true, message: "Заказ успешно удален" });
        } catch (err) {
            res.status(500).json({
                status: false,
                error: 'Internal Server Error',
                message: 'Failed to delete order'
            })
        }
    }
    async getUserOrders(req, res){
        try {
            const cart = await Order.findOne({ userId: req.params.userId });
            res.json(cart);
        } catch (err) {
            res.status(500).json({
                status: false,
                error: 'Internal Server Error',
                message: 'Failed to get user orders'
            })
        }
    }

    async getAllOrders(req, res){
        try {
            const carts = await Order.find({}, { _id: 0 });
            res.status(200).json({status: true, message: 'Вот список актуальных заказов', data: carts})
        } catch (err) {
            res.status(500).json({
                status: false,
                error: 'Internal Server Error',
                message: 'Failed to get all orders'
            })
        }
    }

    async getMonthlyIncome (req, res){
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount",
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" },
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (err) {
            res.status(500).json({
                status: false,
                error: 'Internal Server Error',
                message: 'Failed to get monthly income'
            })
        }
    }
}

module.exports = new orderController()
