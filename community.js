// Discord API Integration
const PROXY_URL = 'http://localhost:3000'; // Change this to your deployed proxy URL

async function fetchDiscordData() {
    try {
        // Fetch guild info
        const guildResponse = await fetch(`${PROXY_URL}/guild`);
        const guild = await guildResponse.json();

        // Fetch members
        const membersResponse = await fetch(`${PROXY_URL}/members`);
        const members = await membersResponse.json();

        return { guild, members };
    } catch (error) {
        console.error('Error fetching Discord data:', error);
        return null;
    }
}

function getRoleColor(roleId) {
    // Discord role color mapping (you'll need to customize these based on your server's roles)
    const roleColors = {
        'owner': '#ffcc00',    // Gold
        'admin': '#ff4d4d',    // Red
        'mod': '#00ccff',      // Cyan
        'member': '#00ff99',   // Green
        'visitor': '#cccccc'   // Grey
    };

    // Map role IDs to colors (customize based on your Discord server)
    const roleMapping = {
        // Add your actual Discord role IDs here
        // 'ROLE_ID_HERE': 'owner',
        // 'ROLE_ID_HERE': 'admin',
        // etc.
    };

    return roleColors[roleMapping[roleId] || 'member'];
}

function createRoleCard(roleName, members, color) {
    const card = document.createElement('div');
    card.className = 'role-card';
    card.style.borderColor = color;

    const title = document.createElement('h2');
    title.className = 'role-title';
    title.style.color = color;
    title.textContent = roleName;

    const list = document.createElement('ul');
    list.className = 'member-list';

    members.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member.user.username;
        list.appendChild(li);
    });

    card.appendChild(title);
    card.appendChild(list);

    return card;
}

async function loadCommunity() {
    const data = await fetchDiscordData();

    if (!data) {
        // Fallback to static data if API fails
        console.log('Using fallback data');
        loadFallbackData();
        return;
    }

    const { guild, members } = data;

    // Update server info if you want to display it
    console.log('Guild:', guild.name, 'Members:', guild.approximate_member_count);

    // Group members by roles
    const roleGroups = {
        '👑 Owner': [],
        '🛡️ Admin': [],
        '⚔️ Mod': [],
        '💬 Member': [],
        '👀 Visitor': []
    };

    // Sort members by role hierarchy - using position-based sorting
    members.forEach(member => {
        // Sort roles by position (higher position = higher role)
        const sortedRoles = member.roles.sort((a, b) => {
            // This assumes roles have position data, but Discord API doesn't provide it directly
            // For now, we'll use a simple hierarchy based on common role names
            const roleNames = ['owner', 'admin', 'administrator', 'mod', 'moderator', 'member', 'player'];
            const aName = a.name ? a.name.toLowerCase() : '';
            const bName = b.name ? b.name.toLowerCase() : '';

            const aIndex = roleNames.findIndex(name => aName.includes(name));
            const bIndex = roleNames.findIndex(name => bName.includes(name));

            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
            }
            return 0;
        });

        // Check the highest role
        const highestRole = sortedRoles[0];
        const roleName = highestRole && highestRole.name ? highestRole.name.toLowerCase() : '';

        if (roleName.includes('owner') || roleName.includes('founder')) {
            roleGroups['👑 Owner'].push(member);
        } else if (roleName.includes('admin') || roleName.includes('administrator')) {
            roleGroups['🛡️ Admin'].push(member);
        } else if (roleName.includes('mod') || roleName.includes('moderator')) {
            roleGroups['⚔️ Mod'].push(member);
        } else if (roleName.includes('member') || roleName.includes('player') || roleName.includes('vip')) {
            roleGroups['💬 Member'].push(member);
        } else {
            roleGroups['👀 Visitor'].push(member);
        }
    });

    // Clear existing content
    const leaderboard = document.querySelector('.leaderboard');
    leaderboard.innerHTML = '';

    // Add role cards
    Object.entries(roleGroups).forEach(([roleName, roleMembers]) => {
        if (roleMembers.length > 0) {
            const color = getRoleColor(roleName.toLowerCase().split(' ')[1]);
            const card = createRoleCard(roleName, roleMembers, color);
            leaderboard.appendChild(card);
        }
    });
}

function loadFallbackData() {
    // Fallback static data when Discord API is not available
    const fallbackMembers = {
        '👑 Owner': [
            { user: { username: 'Lazare' } }
        ],
        '🛡️ Admin': [
            { user: { username: 'Nika' } },
            { user: { username: 'Alex' } }
        ],
        '⚔️ Mod': [
            { user: { username: 'Mia' } },
            { user: { username: 'Keto' } }
        ],
        '💬 Member': [
            { user: { username: 'Steve' } },
            { user: { username: 'AlexCraft' } },
            { user: { username: 'EpicMiner' } }
        ],
        '👀 Visitor': [
            { user: { username: 'Guest1' } },
            { user: { username: 'Guest2' } }
        ]
    };

    // Clear existing content
    const leaderboard = document.querySelector('.leaderboard');
    leaderboard.innerHTML = '';

    // Add role cards with fallback data
    Object.entries(fallbackMembers).forEach(([roleName, roleMembers]) => {
        if (roleMembers.length > 0) {
            const color = getRoleColor(roleName.toLowerCase().split(' ')[1]);
            const card = createRoleCard(roleName, roleMembers, color);
            leaderboard.appendChild(card);
        }
    });
}

// Glow Pulse Animation for Role Titles
document.addEventListener('DOMContentLoaded', () => {
    loadCommunity(); // Load Discord data

    const roleTitles = document.querySelectorAll('.role-title');

    // Function to add glow pulse to a random role title
    function addRandomGlow() {
        // Remove glow from all titles first
        roleTitles.forEach(title => {
            title.classList.remove('glow-pulse');
        });

        // Add glow to a random title
        const randomIndex = Math.floor(Math.random() * roleTitles.length);
        if (roleTitles[randomIndex]) {
            roleTitles[randomIndex].classList.add('glow-pulse');
        }

        // Schedule next glow change
        setTimeout(addRandomGlow, 3000 + Math.random() * 2000); // 3-5 seconds
    }

    // Start the glow animation cycle
    addRandomGlow();

    // Add hover effects for enhanced interaction
    roleTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.transform = 'scale(1.05)';
            title.style.transition = 'transform 0.2s ease';
        });

        title.addEventListener('mouseleave', () => {
            title.style.transform = 'scale(1)';
        });
    });

    // Add subtle parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.role-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        cards.forEach((card, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});
