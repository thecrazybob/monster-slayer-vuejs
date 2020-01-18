new Vue({
    
    el: '#app',

    data: {
        humanHp: 100,
        monsterHp: 100,
        finished: false,
        winner: '',
        messages: []
    },

    methods: {

        /**
         * Method: action
         * Called when a game action is initiated by the user
         * * Possible actions ['attack', 'special-attack', 'heal', 'give-up]
         * @param {string} actionType 
         */
        action: function(actionType) {

            // Only execute this method if the game is not finished yet
            if (this.finished != true) {
                
                if (actionType === "attack" || actionType === "special-attack") {

                    // Calculate the damage to 'human'
                    humanDamage = this.calcDamage(actionType)

                    // Calculate the damage to 'monster'
                    monsterDamage = this.calcDamage('normal')

                    // Subtract the damage
                    this.humanHp -= humanDamage
                    this.monsterHp -= monsterDamage

                    // Log the actions
                    this.logger(actionType, 'human', humanDamage)
                    this.logger(actionType, 'monster', monsterDamage)

                }

                // heal
                else if (actionType === "heal") {

                    // Calclulate the heal amount for 'human'
                    humanHeal = this.calcHeal()

                    // Add the heal to HP
                    this.humanHp += humanHeal

                    // Calculate damage given to human
                    humanDamage = this.calcDamage('normal')

                    // Subtract the damage from humanHp
                    this.humanHp -= humanDamage
                    
                    // If humanHp is more than 100 then humanHp = 100
                    this.humanHp > 100 ? this.humanHp = 100 : ''
                    
                    // Log the actions
                    this.logger("heal", "human", humanHeal)
                    this.logger("attack", "monster", humanDamage)
                
                }

                // give-up
                else if (actionType === "give-up") {

                    // Announce the winner
                    this.winner = "Monster"
                    this.logger("surrender", "human")
                    this.finished = true

                }

                // End the game if one of the players have an HP of 0 or less
                if (this.monsterHp <= 0 || this.humanHp <= 0) {

                    // Mark the game as finished
                    this.finished = true

                    // Assign 'human' as winner if humanHp is greater than monsterHp
                    if (this.humanHp > this.monsterHp) {
                        this.winner = 'human'
                        alert("You won!")
                    }

                    // Assign 'monster' as winner if monsterHp is greater than humanHp
                    else if (this.monsterHp > this.humanHp) {
                        this.winner = 'monster'
                        alert("Better luck next time :)")
                    }

                    // Assign 'tie' as this.winner if the HP is equal
                    else {
                        this.winner = 'tie'
                    }

                    // Log the result of the game
                    this.logger('result', this.winner)
                
                }

            }
        },
        
        /**
         * Method: calcDamage
         * Calculates random damage and returns damage value
         * @param {string} attackType 
         * @return {int}
         */
        calcDamage: function(attackType) {

            // Determine the damage value for 'normal' attacks
            if (attackType == "special-attack") {
                damage = 50
            }

            // Determine the damage value for 'special' attacks
            else {
                damage = 30
            }

            // Calculate the damage value using the 'damage' variable
            return Math.floor(Math.random() * (damage+1))

        },
        
        /**
         * Method: calcHeal
         * Calculates random heal HP and returns the value
         * @return {int}
         */
        calcHeal: function() {
            
            // Calculate and round off a random heal HP from the range of 0 - 15
            return Math.floor(Math.random() * 16)
        
        },
        
        /**
         * Resets the game data
         */
        reset: function () {
            
            this.humanHp = 100
            this.monsterHp = 100
            this.messages = []
            this.finished = false
            this.winner = null

        },

        /**
         * Method: logger
         * Provides a log of the game actions / stores the message in this.message
         * @param {string} task Name of action / task
         * @param {string} person Name of person (human / monster)
         * @param {int} damage Amount of damage
         * @return {string} Message to be shown to the user / stored to the log
         */
        logger: function(task, person, damage = null) {

            // Set the person name to "You" if the person = "human"
            if (person == "human") {
                person = "You"
                isPlayer = true
            }
            else {
                isPlayer = false
            }
            // Capitalize the first letter of 'person'
            message = person.toUpperCase() + " "

            /*
            Return a message based on 'task'
            */
            if (task === "attack") {
                message += "attacked for " + damage
            }
            else if (task === "result") {
                message += "won Monster Slayer"
            }
            else if (task === "special-attack") {
                message += "gave a blow for " + damage
            }
            else if (task === "heal") {
                message += "healed himself by " + damage
            }
            else if (task === "surrender") {
                message += "gave up! :("
            }
            
            log = [message, isPlayer]

            // Add the message to 'messages' array
            this.messages.push(log)

            // Return the message
            return message

        }
    }
});