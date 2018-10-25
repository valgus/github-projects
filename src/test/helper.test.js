import * as helper from '../utils/helper';
import * as data from './test-data'

describe("testing prepareQuery...", () => {
    let licenses = data.licenses;
    let subname = 'mock_subname';

    it("contains licenses isc and mit", () => {
        const resultQuery = helper.prepareQuery(licenses, subname);
        const filters = resultQuery.split(" ");
        expect(filters).toContain('sort:stars');
        expect(filters).toContain('language:javascript');
        expect(filters).toContain('license:mit');
        expect(filters).toContain('license:apache-2.0');
        expect(filters).toContain('mock_subname');
        expect(filters).toContain('in:name');
        expect(filters[2]).toMatch(new RegExp('created:>=\\d{4}-\\d{2}-\\d{2}', '\g'));
    })
})

describe("testing getFlatProject...", () => {
    const tree = data.rawGraphQLResponse;

    it("return flat object for each node in GraphQL tree", () => {
        tree.map((node, index) => {
            const flatObject = helper.getFlatProject(node);
            const expected = data.flatProjects[index];
            expect(flatObject).toEqual(expected); 
        })
    })
})

describe("testing sortLicenses...", ()=> {
    let licenses = data.licenses
    it("returns array in alphabetical order", () => {
        expect([...licenses].sort(helper.sortLicenses)).toEqual([licenses[2], licenses[1], licenses[0]]);
    })
})
