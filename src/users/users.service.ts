import { UpdateUserDto } from "./dtos/updateUser.dto";
import { User } from "./models/user.model";

export class UsersService {
    getUsersBasedOnGender(gender: string): User[] {
        return this._users.filter(user => user.gender?.toLowerCase() === gender.toLowerCase());
    }
    private _users: User[] = [
        {
            id: '1',
            name: 'Mohamed',
            email: 'mohamed@gmail.com',
            password: '123456',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            age: 25,
            bio: 'Iam a software engineer',
            gender: 'Male',
            location: 'Cairo',
            phone: '01012345678'
        },
        {
            id: '2',
            name: 'Ahmed',
            email: 'ahmed@gmail.com',
            password: '123456',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
            age: 30,
            bio: 'Iam a doctor',
            gender: 'Male',
            location: 'Alexandria',
            phone: '01112345678'
        },
        {
            id: '3',
            name: 'Sara',
            email: 'sara@example.com',
            password: '123456',
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
            age: 20,
            gender: 'female',
            bio: 'Iam a student',
            location: 'Giza',
            phone: '01212345678'
        }
    ];

    getAllUsers(): User[] {
        return this._users;
    }

    getUserById(id: string): User | undefined {
        return this._users.find(user => user.id === id);
    }


    createUser(user: User): void {
        this._users.push(user);
    }

    updateUser(id: string, user: UpdateUserDto): boolean {
        var existingUser = this._users.find(u => u.id === id);
        if (!existingUser)
            return false;

        existingUser.name = user.name;
        existingUser.email = user.email;
        existingUser.password = user.password;
        existingUser.role = user.role;
        existingUser.age = user.age;
        existingUser.bio = user.bio;
        existingUser.location = user.location;
        existingUser.phone = user.phone;

        return true;
    }


    deleteUser(id: string): boolean {
        var existingUserIndex = this._users.findIndex(u => u.id === id);
        if (existingUserIndex === -1)
            return false;

        this._users.splice(existingUserIndex, 1);
        return true;
    }

}