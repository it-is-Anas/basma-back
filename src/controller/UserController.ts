import { Response, NextFunction } from "express";
import { Req } from '../types';
import User from '../model/User';

export const myProfile = (req: Req ,res: Response, next: NextFunction) => {
    res.json({
        msg:'Your profile !',
        data: req.user
    });
}

export const uploadProfilePicture = async (req: Req, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                msg: 'You didn\'t upload any image !'
            });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                msg: 'Please log in again !'
            });
        }

        const fileName = req.file.filename;
        const imageUrl = `/uploads/${fileName}`;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { img: imageUrl },
            { new: true, select: '-password' }
        );

        if (!updatedUser) {
            return res.status(404).json({ 
                msg: 'User not found !'
            });
        }

        res.json({
            success: true,
            message: 'Profile picture uploaded successfully',
            data: {
                user: updatedUser,
                imageUrl: imageUrl
            }
        });

    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
};