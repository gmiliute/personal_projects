import enum


class UserRole(str, enum.Enum):
    ADMIN = "Admin"
    USER = "User"
