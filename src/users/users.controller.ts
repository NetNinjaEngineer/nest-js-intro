import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/updateUser.dto";

@Controller('/api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAllUsers(): User[] {
        return this.usersService.getAllUsers();
    }

    @Post()
    createNewUser(@Body() user: User): User[] {
        var allUsersCount = this.usersService.getAllUsers().length;
        user.id = (allUsersCount + 1).toString();
        this.usersService.createUser(user);
        return this.usersService.getAllUsers();
    }

    // @Get(':id/:name/:gender')
    // getUserById(@Param() parameters: any): void {
    //     console.log(parameters);
    // }


    @Get(':id')
    getUserById(@Param('id') id: string): User | undefined {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userForUpdatePayload: UpdateUserDto): boolean {
        return this.usersService.updateUser(id, userForUpdatePayload);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): User[] {
        var isDeleted = this.usersService.deleteUser(id);
        return this.usersService.getAllUsers();
    }

}