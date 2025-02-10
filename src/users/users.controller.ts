import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/updateUser.dto";

// pipes are functions that is used to transform the input data to the desired format
// pipes are used to validate the input data before it reaches the controller
// used to clean and sanitize the input data and convert it to the specific format that ensures
// that the data before reaching the controller is in the correct format

@Controller('/api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    // @Get()
    // getAllUsers(): User[] {
    //     return this.usersService.getAllUsers();
    // }

    @Get()
    getAllUsers(@Query() queryParameters: any): User[] {

        console.log(queryParameters);

        if (queryParameters.gender) {
            return this.usersService.getAllUsers().filter(user => user.gender?.toLowerCase() === queryParameters.gender.toLowerCase());
        }

        return this.usersService.getAllUsers();
    }

    @Get('/usersv2')
    getV2Users(@Query('gender') gender: string): User[] {
        return this.usersService.getAllUsers().filter(user => user.gender?.toLowerCase() == gender.toLowerCase());
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