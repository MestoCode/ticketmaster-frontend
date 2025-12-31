import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderAPI, adminAPI } from '../services/api';
import Spinner from '../components/Spinner';

function Dashboard() {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError('');
            // Use admin endpoint to get all orders
            const response = await adminAPI.getAllOrders();
            setOrders(response.orders || []);
        } catch (err) {
            // Fallback to regular getAll if admin endpoint fails
            try {
                const response = await orderAPI.getAll();
                setOrders(response.orders || []);
            } catch (fallbackErr) {
                setError('Failed to fetch orders. Please try again.');
                console.error('Error fetching orders:', fallbackErr);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen py-12 px-4'>
            <div className='container mx-auto max-w-7xl'>
                {/* Header */}
                <div className='flex justify-between items-center mb-8'>
                    <div>
                        <h1 className='text-4xl font-bold text-white mb-2'>Admin Dashboard</h1>
                        <p className='text-white/60'>Welcome, {user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300'
                    >
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-primary border border-primary_hint/20 rounded-xl p-6'>
                        <p className='text-primary_hint text-sm font-semibold mb-2'>Total Orders</p>
                        <p className='text-3xl font-bold text-white'>{orders.length}</p>
                    </div>
                    <div className='bg-primary border border-primary_hint/20 rounded-xl p-6'>
                        <p className='text-primary_hint text-sm font-semibold mb-2'>Total Revenue</p>
                        <p className='text-3xl font-bold text-white'>
                            ${orders.reduce((sum, order) => sum + (parseFloat(order.totalPrice || order.price) || 0), 0).toFixed(2)}
                        </p>
                    </div>
                    <div className='bg-primary border border-primary_hint/20 rounded-xl p-6'>
                        <p className='text-primary_hint text-sm font-semibold mb-2'>Average Order</p>
                        <p className='text-3xl font-bold text-white'>
                            ${orders.length > 0 
                                ? (orders.reduce((sum, order) => sum + (parseFloat(order.totalPrice || order.price) || 0), 0) / orders.length).toFixed(2)
                                : '0.00'}
                        </p>
                    </div>
                </div>

                {/* Orders Table */}
                <div className='bg-primary border border-primary_hint/20 rounded-xl overflow-hidden'>
                    <div className='p-6 border-b border-primary_hint/20'>
                        <h2 className='text-2xl font-bold text-white'>All Orders</h2>
                    </div>

                    {loading ? (
                        <div className='p-12'>
                            <Spinner />
                        </div>
                    ) : error ? (
                        <div className='p-12 text-center'>
                            <p className='text-red-400 mb-4'>{error}</p>
                            <button
                                onClick={fetchOrders}
                                className='px-6 py-3 bg-primary_important hover:bg-primary_hint text-white font-semibold rounded-lg transition duration-300'
                            >
                                Retry
                            </button>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className='p-12 text-center'>
                            <p className='text-white/60 text-lg'>No orders found</p>
                        </div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-app_bg'>
                                    <tr>
                                        <th className='px-6 py-4 text-left text-sm font-semibold text-primary_hint'>ID</th>
                                        <th className='px-6 py-4 text-left text-sm font-semibold text-primary_hint'>Title</th>
                                        <th className='px-6 py-4 text-left text-sm font-semibold text-primary_hint'>Price</th>
                                        <th className='px-6 py-4 text-left text-sm font-semibold text-primary_hint'>Created At</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-primary_hint/10'>
                                    {orders.map((order) => (
                                        <tr key={order.id} className='hover:bg-app_bg/50 transition duration-150'>
                                            <td className='px-6 py-4 text-white text-sm'>{order.id}</td>
                                            <td className='px-6 py-4 text-white font-medium'>{order.title}</td>
                                            <td className='px-6 py-4 text-white'>${typeof order.totalPrice === 'number' ? order.totalPrice.toFixed(2) : typeof order.price === 'number' ? order.price.toFixed(2) : parseFloat(order.totalPrice || order.price || 0).toFixed(2)}</td>
                                            <td className='px-6 py-4 text-white/60 text-sm'>
                                                {order.createdAt 
                                                    ? new Date(order.createdAt).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

