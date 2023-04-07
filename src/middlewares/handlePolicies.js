const handlePolicies = (policies) => {
    if(policies.includes('PUBLIC')) {
        return (req, res, next) => {
            next();
        };
    };
    return async (req, res, next) => {
        if(!req.session.user) {
            return res.status(401).json({message: 'Debes ser un usuario registrado para ver esta página'});
        } 

        if(!policies.includes(req.session.user.role.toUpperCase())) {
            return res.status(403).json({message: 'No tiene autorización para ver esta página'})
        }

        next();
    };  
};

export default handlePolicies;