# Tic Tac Toe

# Display the board
def display_board(board):
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---|---|---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---|---|---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")

# Get player's move
def player_input(player, board):
    while True:
        try:
            position = int(input(f"Player {player} ({'X' if player == 1 else 'O'}), choose your position (1-9): ")) - 1
            if position not in range(9):
                print("Invalid position. Choose a number between 1 and 9.")
            elif board[position] != ' ':
                print("That position is already taken. Choose another.")
            else:
                return position
        except ValueError:
            print("Please enter a valid number.")

# Check if someone won
def check_win(board, mark):
    win_combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columns
        [0, 4, 8], [2, 4, 6]              # diagonals
    ]
    for combo in win_combos:
        if all(board[i] == mark for i in combo):
            return True
    return False

# Check if board is full (tie)
def is_board_full(board):
    return all(cell != ' ' for cell in board)

# The main game loop
def play():
    board = [' '] * 9
    current_player = 1  # Player 1 starts (X)

    display_board(board)

    while True:
        position = player_input(current_player, board)
        board[position] = 'X' if current_player == 1 else 'O'
        display_board(board)

        if check_win(board, 'X' if current_player == 1 else 'O'):
            print(f"Player {current_player} wins!")
            break

        if is_board_full(board):
            print("It's a tie!")
            break

        # Switch player
        current_player = 2 if current_player == 1 else 1

# Start the game
if __name__ == "__main__":
    play()
