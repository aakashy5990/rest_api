require('dotenv').config();

const maintenanceMiddleware = (req,res,next) => {
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
    if (isMaintenanceMode) {
        return res.render('maintenance/maintenance', { progress:'Work on Progress' });
    }
    
    next();
}

module.exports = { maintenanceMiddleware };